import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {

    private readonly saltRounds = 10;

    constructor(@InjectModel(`User`) private readonly userModel: Model<IUser>) {
    }

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.saltRounds);
        return await bcrypt.hash(password, salt);
    }

    async create(createUserDto: CreateUserDto): Promise<IUser> {
        const hash = await this.hashPassword(createUserDto.password);
        const createdUser = new this.userModel({ ...createUserDto, password: hash });
        return await createdUser.save();
    }

    async find(id: string): Promise<IUser> {
        return await this.userModel.findById(id).exec();
    }

    async findByEmail(email: string): Promise<IUser> {
        return await this.userModel.findOne({ email }).exec();
    }

    async update(_id: string, payload: Partial<IUser>): Promise<IUser> {
        return this.userModel.updateOne({ _id }, payload);
    }
}
