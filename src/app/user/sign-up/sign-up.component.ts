import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'safeHtml'})
export class Safe implements PipeTransform {
  constructor(private sanitizer:DomSanitizer){}

  transform(style) {
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }
}

declare var $:any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})


export class SignUpComponent implements OnInit {
  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  isUserValid: boolean = true;
  url: string ="";
  StringEr: string ="";
  constructor(private userService: UserService, private toastr: ToastrService) { }
  focusOutFunction(frm: NgForm)
  {
    
    this.userService.getUser(this.user.UserName).subscribe((data : any)=>{

      if (JSON.parse(data).length ==0)
      {
        this.isUserValid = true;
        this.StringEr ="You account valid."
      }
      else
      {
        this.isUserValid = false;
        this.StringEr = 'Account already exists. <a href="login">Sign in</a>'
      }
    },
    (err : Error)=>{
      this.isUserValid = false;
      this.StringEr = 'Account already exists. <a href="login">Sign in</a>'
    });
  }
  ngOnInit() {
    // $('#UserName').blur(function(){
     
    // })

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
