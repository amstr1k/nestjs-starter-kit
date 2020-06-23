import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { IReadableUser } from '../user/interfaces/readable-user.interface';

@ApiTags(`auth`)
@Controller(`auth`)
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post(`/signUp`)
    async signUp(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<boolean> {
        return await this.authService.signUp(createUserDto)
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });
    }

    @Post(`/signIn`)
    async signIn(@Body(new ValidationPipe()) signInDto: SignInDto): Promise<IReadableUser> {
        return await this.authService.signIn(signInDto);
    }
}
