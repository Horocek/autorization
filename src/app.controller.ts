import { Get, Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './common/user/user.service'
import { UserController } from './versions/v1/controllers/user.controller';
import { UserTokenService } from './common/user/token/user-token.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('login')
  async login(@Body() body: any) {
    const usersService = new UserService(new UserTokenService());
    return new UserController(usersService).login(body.login, body.pass);
  }
}