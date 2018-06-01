import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';

declare var $:any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  strCheckUser: string ="";
  constructor(private userService: UserService, private toastr: ToastrService) { }
  focusOutFunction()
  {
    this.userService.getUser(this.user.UserName).subscribe((data : any)=>{

      if (JSON.parse(data).length ==0)
      {
        this.strCheckUser="User hợp lệ";
      }
      else
      {
        this.strCheckUser="User không hợp lệ";
      }
    },
    (err : HttpErrorResponse)=>{
      $("divError").value="user name invalid"
      console.log("user name invalid")
    });
  }
  ngOnInit() {
    $('#UserName').blur(function(){
     
    })

    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      UserName: '',
      Password: '',
      Email: '',
      FirstName: '',
      LastName: '',
      PhoneNumber:'',
    }
  }

  OnSubmit(form: NgForm) {
    this.userService.registerUser(form.value)
      .subscribe((data: any) => {
        if (data.Succeeded == true) {
          this.resetForm(form);
          this.toastr.success('User registration successful');
        }
        else
          this.toastr.error(data.Errors[0]);
      });
  }

}
