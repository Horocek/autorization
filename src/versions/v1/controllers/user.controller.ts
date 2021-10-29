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
      "status" : false,
      "statusCode": 401,
      "error": "Unauthorized"
    }
  };

  autorized(token: string): object {
    return {
      "status" : true,
      "token": token
    }
  };

  login(userEmail: string, userPass: string): object {
    const user = this.userService.findUserByEmail(userEmail);
    if (!user) {
      return this.unauthorized();
    }
    const isValidPassword = this.userService.isValidPassword(user, userPass);
    if (isValidPassword) {
      return this.autorized(this.userService.getToken());
    } 
    return this.unauthorized();
  }
}