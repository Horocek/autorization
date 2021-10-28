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
    const usersService = new UserService('');
    const trueUser = usersService.findUserByEmail(userEmail);
    if (!trueUser) {
      return this.unauthorized();
    }
    return (trueUser.password === userPass) ?
      this.autorized(randomstring.generate(32)) : this.unauthorized();
  }
}