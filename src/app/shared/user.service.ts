import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from './user.model';
import { query } from '@angular/animations';

@Injectable()
export class UserService {
  readonly rootUrl = 'http://localhost:35257';
  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    const body: User = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName,
      PhoneNumber: user.PhoneNumber,
    }
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.rootUrl + '/api/User/Register', body,{headers : reqHeader});
  }

  updateUser(user: User) {
    var sql: Query =
    {
      query: "Update [User] set Email ='" + user.Email + "', LastName =N'" + user.LastName + "', FirstName =N'" + user.FirstName + "', PhoneNumber ='" + user.PhoneNumber +"' where UserName ='" +  user.UserName +"'"
    } 
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
    return  this.http.post(this.rootUrl+'/api/SqlServer/ExecSQL', sql, { headers: reqHeader });
  }

  userAuthentication(userName, password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
  }

  getUserClaims(){
   return  this.http.get(this.rootUrl+'/api/GetUserClaims');
  }

  getListUsers(){
    let data: Query = {
      query: "select * from [User]"
    }
    
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
    return  this.http.post(this.rootUrl+'/api/SqlServer/ReturnDataTable/', data, { headers: reqHeader });
   }

   getUser(id: string){
    let data: Query = {
      query: "select * from [User] where UserName ='" + id + "'"
    }
    
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
    return  this.http.post(this.rootUrl+'/api/SqlServer/ReturnDataTable/', data, { headers: reqHeader });
   }

   addUser(ssQL: string){
    let data: Query = {
      // query: "INSERT INTO TUsers(userName,[password],email) VALUES ('ladmin','123456',null)"
      query: ssQL
    }
    
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
    return  this.http.post(this.rootUrl+'/api/SqlServer/ExecSQL', data, { headers: reqHeader });
   }

}
export  class Query
{
    public  query:string;

}
