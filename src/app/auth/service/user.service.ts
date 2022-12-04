import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../dto/user.model";
import {RegisterDto} from "../dto/register.dto";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  active: User;
  admin: User = new User('discash@gmail.com','Administrator','password');
  user: User = new User('user@gmail.com','User','password');
  userChanged: Subject<User> = new Subject<User>();

  constructor(private http: HttpClient) {
    this.user.permissions = ['user']
    this.active = this.admin
  }

  getLoggedInUser(){
    return this.active;
  }

  getOtherUser(permissions: string[]) {
    if(permissions.includes('admin')){
      this.active = this.user
      this.userChanged.next(this.user)
    }else{
      this.active = this.admin
      this.userChanged.next(this.admin)
    }
  }

}
