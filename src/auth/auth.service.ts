import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as dayjs from 'dayjs';
import { JwtService } from '@nestjs/jwt';
import { SignOptions } from 'jsonwebtoken';

import { UserService } from '../user/user.service';
import { IUser } from 'src/user/interfaces/user.interface';
import { IReadableUser } from '../user/interfaces/readable-user.interface';
import { SignInDto } from './dto/signin.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ITokenPayload } from './interfaces/token-payload.interface';
import { CreateUserTokenDto } from '../token/dto/create-user-token.dto';
import { TokenService } from '../token/token.service';
import { mapToReadableUser } from 'src/user/mappers/user.mapper';
import { IUserToken } from '../token/interfaces/user-token.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
        private readonly jwtService: JwtService){}

    async signUp(createUserDto: CreateUserDto): Promise<IUser> {
        return this.userService.create(createUserDto);
    }

    async signIn({ email, password }: SignInDto): Promise<IReadableUser> {
        const user = await this.userService.findByEmail(email);

        if (user && (await bcrypt.compare(password, user.password))) {
            const tokenPayload: ITokenPayload = {
                _id: user._id
            };
            const token = await this.generateToken(tokenPayload);
            const expireAt = dayjs()
                .add(1, `day`)
                .toISOString();

            await this.saveToken({
                token,
                expireAt,
                userId: user._id,
            });

            return mapToReadableUser(user, token);
        }
        throw new BadRequestException(`Invalid credentials`);
    }

    private async generateToken(data: ITokenPayload, options?: SignOptions): Promise<string> {
        return this.jwtService.sign(data, options);
    }

    private async saveToken(createUserTokenDto: CreateUserTokenDto): Promise<IUserToken> {
        return this.tokenService.create(createUserTokenDto);
    }
}
