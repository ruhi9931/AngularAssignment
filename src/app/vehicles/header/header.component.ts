import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user/user.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  displayUserDialog:boolean=false;
  user!: User;
  isAdmin:boolean=true;
  constructor(private router:Router, private route:ActivatedRoute,private datastorageService:DataStorageService,private authService:AuthService){}

  ngOnInit() {
    this.datastorageService.retrieveUserDetail().subscribe(
      (res: User) => {
        this.user = res;
        console.log(this.user);
        
      }
    );

    this.isAdmin=this.authService.isAdmin;
    // this.authService.autoLogin();
  }
  
  onClick(){
    // this.router.navigate(['user-detail']);
    this.displayUserDialog=true;
  }

  onClickBooking(){
    this.router.navigate(['booking']);
  }

  onClickLogout(){
    this.authService.logout();
  }

  onClickManage(){
    this.router.navigate(['/manage']);
  }
}