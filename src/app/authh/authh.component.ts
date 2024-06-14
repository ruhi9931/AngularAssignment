import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from '../Auth/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authh',
  templateUrl: './authh.component.html',
  styleUrls: ['./authh.component.css']
})
export class AuthhComponent {
  confirmPassword:string='';
  signupSuccess:boolean = false;
  error:string='';
  isLogin:boolean=false;
  // role:string='';

  constructor(private authService:AuthService, private router:Router){}
  toggleForm(){
    this.isLogin=!this.isLogin;
  }
  onSubmitLogin(form:NgForm){
    if(!form.valid){
      return;
    }
    

    const email = form.value.email;
    const password = form.value.password;

    if(email==='admin@gmail.com' && password==='0987654321'){
      this.authService.isAdmin=true;
      // localStorage.setItem('admin',JSON.stringify(this.authService.isAdmin));
    }else{
      this.authService.isAdmin=false;;
    }

    let authObs: Observable<AuthResponseData>;

 
    // authObs = this.authService.signup(email,password);
    authObs = this.authService.login(email,password);
    

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.router.navigate(['home']);
      },
      errorMessage=>{
        console.log(errorMessage);
        this.error=errorMessage;
      }
    )
    form.reset();
  }

  onSubmitSignup(form:NgForm){
    if(!form.valid){
      return;
    }
    
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    authObs = this.authService.signup(email,password);
    
    authObs.subscribe(
      resData => {
        console.log(resData);
        this.signupSuccess=true;
        this.isLogin=true;
      },
      errorMessage=>{
        console.log(errorMessage);
        this.error=errorMessage;
      }
    )
    form.reset();
  }
  }