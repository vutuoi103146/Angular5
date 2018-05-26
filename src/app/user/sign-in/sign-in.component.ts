import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../shared/user.model';
import { DataService } from '../../shared/app.services';
declare var $:any;
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isLoginError : boolean = false;

  constructor(private userService : UserService,
    private router : Router,
    private appServices: DataService) { }

  ngOnInit() {
    $('#UserName').keydown(function(){
      // alert("hiiii");
    })
  }
  // @Output() onVote = new EventEmitter<any>();
  OnSubmit(userName,password){
     this.userService.userAuthentication(userName,password).subscribe((data : any)=>{
      localStorage.setItem('userToken',data.access_token);
      localStorage.setItem('userName',userName);
      this.appServices.changeMessage(userName);
      this.router.navigate(['/listUsers']);
    },
    (err : HttpErrorResponse)=>{
      this.isLoginError = true;
    });
  }
}
