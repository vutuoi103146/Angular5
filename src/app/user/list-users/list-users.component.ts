import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  users: any[];
  constructor(private userService: UserService, private router: Router) {

   }

  ngOnInit() {
    this.userService.getListUsers().subscribe((data: string) => {
      this.users = JSON.parse(data);
    });
  }

}
