import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { User } from '../../shared/user.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private userService: UserService, 
    private toastr: ToastrService,
     private activeRouter: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }
  private id : string
  initForm() {
   this.id =  this.activeRouter.snapshot.params.id;
    this.userService.getUser(this.id).subscribe((data:string) =>{
      this.user = JSON.parse(data)[0];
    });
  }

  OnSubmit(form: NgForm) {
    this.userService.updateUser(this.user)
      .subscribe((data: any) => {
        if (data) {
          this.toastr.success('User registration successful');
          this.router.navigate(['/listUsers']);
        }
        else
          this.toastr.error(data.Errors[0]);
      });
  }
}
