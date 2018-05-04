import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { forEach } from '@angular/router/src/utils/collection';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userClaims: any;
  dataSet: any[];
  dataSet1: any;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserClaims().subscribe((data: any) => {
      this.userClaims = data;

    });

    this.userService.getDatas().subscribe((data: string) => {
      // let i: number = 0;
      // this.dataSet=  [];
      // data.forEach(element => {
      //   this.dataSet.push(JSON.parse(element));
      // });
      this.dataSet1 = data;
      // console.log(this.dataSet);
    });
  }

  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }


}
