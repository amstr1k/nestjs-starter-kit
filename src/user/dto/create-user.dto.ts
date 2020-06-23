import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    readonly email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly firstName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly lastName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}
