import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { forEach } from '@angular/router/src/utils/collection';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userClaims: any;
  dataSet: any[];
  dataSet1: string;
  sql: string;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserClaims().subscribe((data: any) => {
      this.userClaims = data;

    });

    this.userService.getDatas().subscribe((data: string) => {
      this.dataSet1 = data;
    });

  }

  onExecSQL(frm: NgForm) {
    this.userService.addUser(frm.value.sql).subscribe((data: any) => {
      alert(data);
    });
  }


  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
}
