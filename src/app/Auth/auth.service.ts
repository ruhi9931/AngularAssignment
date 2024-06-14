import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
// import { User } from "./Userr.model";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Userr } from "./Userr.model";


export interface AuthResponseData{
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthService{
    role:string='';
    user = new BehaviorSubject<Userr | null>(null);
    private tokenExpirationTimer:any;
    private _isAdmin:boolean = false;

    get isAdmin():boolean{
      return this._isAdmin;
    }

    set isAdmin(value:boolean){
      this._isAdmin=value;
    }

    constructor(private http:HttpClient, private router:Router){}

    signup(email: string, password: string) {
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCSSRoGJdxRBsjnseFrmJlPycoRsvUJxhM',
            {
              email: email,
              password: password,
              returnSecureToken: true
            }
          )
          .pipe(
            catchError(this.handleError),
            tap(resData=>{
              this.handleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn,
              );
            })
          );
        }

    login(email:string, password:string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCSSRoGJdxRBsjnseFrmJlPycoRsvUJxhM',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
    ).pipe(
        catchError(this.handleError),
        tap(resData => {
            this.handleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn
            );
        })
    );
    }

    autoLogin(){
      const userData:{
        email:string;
        id:string;
        _token:string;
        _tokenExpirationDate:string;
      } = JSON.parse(localStorage.getItem('userData')!);
      if(!userData){
        return;
      }

      const loadedUser = new Userr(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );
  
      if (loadedUser.token) {
        this.user.next(loadedUser);
        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.autoLogout(expirationDuration);
      }
    }

    logout(){
      this.user.next(null);
      this.router.navigate(['/auth']);
      localStorage.removeItem('userData');
      // localStorage.removeItem('admin');
      if(this.tokenExpirationTimer){
        clearTimeout(this.tokenExpirationTimer);
      }
      this.tokenExpirationTimer=null;
    }

    autoLogout(expirationDuration:number){
      this.tokenExpirationTimer=setTimeout(()=>{
        this.logout();
      },expirationDuration);
    }
   
    private handleAuthentication(
        email: string, userId: string, token: string, expiresIn: number, role?: any      ) {
        const expirationDate = new Date(new Date().getTime()+expiresIn * 1000);
        const user = new Userr(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn*1000);
        localStorage.setItem('userData',JSON.stringify(user));
      }


    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'either email or password is incorrect!';
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already';
            break;
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exist.';
            break;
          case 'INVALID_PASSWORD':
            errorMessage = 'This password is not correct.';
            break;
        }
        return throwError(errorMessage);
      }
}