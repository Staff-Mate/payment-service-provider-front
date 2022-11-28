import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

export class User{
  email: string;
  displayName: string;
  password: string;
  permissions: string[];

  constructor(email: string, displayName: string, password: string) {
    this.email = email;
    this.displayName = displayName;
    this.password = password;
    this.permissions = ['admin']
  }
}

@Injectable()
export class UserService {

  active: User;
  admin: User = new User('discash@gmail.com','Administrator','password');
  user: User = new User('user@gmail.com','User','password');
  userChanged: Subject<User> = new Subject<User>();

  constructor() {
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
