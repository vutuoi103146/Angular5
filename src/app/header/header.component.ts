import { Component, OnInit, Input } from '@angular/core';
import { User } from '../shared/user.model';
import {SignInComponent} from '../user/sign-in/sign-in.component'
import { DataService } from '../shared/app.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() user: User;
  userName:string ="";
  show: boolean = true;
  constructor(private appServices: DataService, private router:Router) { 
   
  }

  Logout() {
   // this.show =true;
    this.userName =""
    this.show = true;
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName')
    this.router.navigate(['']);
  }
  ngOnInit() {
    this.setInfo();
  }
  setInfo()
  {
    // this.appServices.currentMessage.subscribe(message => this.userName = message)
    // this.show = (this.userName =="")
    // console.log(this.show)
  }
}
