import {Injectable} from '@angular/core';

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

  admin: User = new User('discash@gmail.com','Administrator','password');
  user: User = new User('user@gmail.com','User','password');

  constructor() {
    this.user.permissions = ['user']
  }

  getLoggedInUser(){
    return this.admin;
  }

  getOtherUser(permissions: string[]) {
    if(permissions.includes('admin')){
      return this.user
    }else{
      return this.admin
    }
  }
}
