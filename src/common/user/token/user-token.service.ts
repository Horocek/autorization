import { Injectable } from '@nestjs/common';
const randomstring = require("randomstring");

@Injectable()
export class UserTokenService {
    generateToken(): string {
        return randomstring.generate(32);
    }
}
