import { Component, OnInit, Input } from '@angular/core';
import { User } from '../shared/user.model';
import {SignInComponent} from '../user/sign-in/sign-in.component'
import { AppService } from '../shared/app.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() user: User;
  userName:string ="";
  show: boolean
  constructor(private appServices: AppService, private router:Router) { 
   
  }

  Logout() {
    this.show =false;
    this.userName =""
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName')
    this.router.navigate(['']);
    console.log(this.show)
  }
  ngOnInit() {
    this.setInfo();
  }
  setInfo()
  {
      this.appServices.childSaid$.subscribe(mess => {
      if (localStorage.getItem('userName'))
      {
        this.userName= localStorage.getItem('userName') ;
      } 
      else
      {
        this.userName = mess;
        if (mess ="-1") this.userName =""
      }
     
    });
    this.userName= localStorage.getItem('userName') ;
    this.show = (this.userName =="");
  }
}
