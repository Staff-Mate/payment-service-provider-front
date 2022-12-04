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
