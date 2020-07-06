import {
    Body,
    Controller,
    Post,
    ValidationPipe,
    Patch,
    UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { IReadableUser } from '../user/interfaces/readable-user.interface';
import { IUser } from '../user/interfaces/user.interface';
import { ChangePasswordDto } from './dto/change-password.dto';
import { GetUser } from '../user/decorators/get-user.decorator';

@ApiTags(`auth`)
@Controller(`auth`)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post(`/signUp`)
    async signUp(
        @Body(new ValidationPipe()) createUserDto: CreateUserDto,
    ): Promise<boolean> {
        return await this.authService
            .signUp(createUserDto)
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });
    }

    @Post(`/signIn`)
    async signIn(
        @Body(new ValidationPipe()) signInDto: SignInDto,
    ): Promise<IReadableUser> {
        return await this.authService.signIn(signInDto);
    }

    @Patch('/changePassword')
    @UseGuards(AuthGuard(`jwt`))
    async changePassword(
        @GetUser() user: IUser,
        @Body(new ValidationPipe()) changePasswordDto: ChangePasswordDto,
    ): Promise<boolean> {
        return this.authService.changePassword(user._id, changePasswordDto);
    }
}
