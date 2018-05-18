import { Component, OnInit, Input } from '@angular/core';
import { User } from '../shared/user.model';
import {SignInComponent} from '../user/sign-in/sign-in.component'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() {
    if (localStorage.getItem('userToken'))
    {
        console.log(localStorage.getItem('userToken'));
    }
    else
    {
      console.log("Not Auth");
    }
  }
}
