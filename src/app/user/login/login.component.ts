import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../shared/user.model';
import { DataService } from '../../shared/app.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginError : boolean = false;
  strErrror: string =""
  constructor(private userService : UserService,
    private router : Router,
    private appServices: DataService) { }

  ngOnInit() {
  
  }
  OnSubmit(userName,password){
     this.userService.userAuthentication(userName,password).subscribe((data : any)=>{
      localStorage.setItem('userToken',data.access_token);
      localStorage.setItem('userName',userName);
      this.appServices.changeMessage(userName);
      this.router.navigate(['/listUsers']);
    },
    (err : HttpErrorResponse)=>{
      this.strErrror ="User Name or Password incorect!";
      this.isLoginError = true;

    });
  }
}
