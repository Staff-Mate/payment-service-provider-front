export class User {
  email: string;
  displayName: string;
  permissions: string[];

  constructor(email: string, displayName: string) {
    this.email = email;
    this.displayName = displayName;
    this.permissions = []
  }
}
