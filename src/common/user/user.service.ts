import { Injectable } from '@nestjs/common';
import { User } from './user';
import { UserTokenService } from './token/user-token.service';

@Injectable()
export class UserService {
  private users = [
    new User('admin@admin.ru', '12345678'),
    new User('user@user.ru', '87654321'),
  ];

  constructor(
    private readonly userTokenService: UserTokenService,
  ) { }

  getToken() {
    return this.userTokenService.generateToken()
  }
  findUserByEmail(email: string): User {
    console.log(this.userTokenService.generateToken());
    return this.users.find(user => user.email === email);
  }
}
