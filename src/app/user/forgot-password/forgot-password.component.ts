import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  isLoginError : boolean = false;
  strErrror: string =""
  constructor(private userService : UserService,private router : Router){

  }
  ngOnInit() {
  
  }
  OnSubmit(userName,password){
     this.userService.userAuthentication(userName,password).subscribe((data : any)=>{

    },
    (err : HttpErrorResponse)=>{
      this.strErrror ="User Name or Password incorect!";
      this.isLoginError = true;

    });
  }
}
