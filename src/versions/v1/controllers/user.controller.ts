import { Controller, Post } from '@nestjs/common';
import { UserService } from '../../../common/user/user.service';

const randomstring = require("randomstring");

@Controller('v1/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  unauthorized(): object {
    return {
      "statusCode": 401,
      "error": "Unauthorized"
    }
  };

  autorized(token: string): object {
    return {
      "token": token
    }
  };

  login(userEmail: string, userPass: string): object {
    const user = this.userService.findUserByEmail(userEmail);
    if (!user) {
      return this.unauthorized();
    }
    return (user.password === userPass) ?
      this.autorized(this.userService.getToken()) : this.unauthorized();
  }
}