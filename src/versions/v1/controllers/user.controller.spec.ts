import { UserController } from './user.controller';
import { UserService } from '..//..//..//common/user/user.service'
import { UserTokenService } from '..//..//..//common/user/token/user-token.service';


describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let userTokenService: UserTokenService;



  beforeEach(() => {
    userTokenService = new UserTokenService();
    userService = new UserService(userTokenService);
    userController = new UserController(userService);
  });


  describe('Autorization user', () => {
    it('should return status == false', () => {
      expect(userController.login('user@lo.cards', '87654321')).toEqual({ "error": "Unauthorized", "status": false, "statusCode": 401 }
      );
    });

    it('should return status == false', () => {
      expect(userController.login(null, '87654321')).toEqual({ "error": "Unauthorized", "status": false, "statusCode": 401 }
      );
    });

    it('should return status == true', () => {
      jest.spyOn(userTokenService, 'generateToken').mockReturnValue("token");
      expect(userController.login('user@user.ru', '87654321')).toEqual({
        "status": true,
        "token": "token"
      }
      );
    });
  });

});
