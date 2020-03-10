import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ConfigModule } from '../../config/config.module';


@Module({
    controllers: [ UserController ],
    imports: [ConfigModule.register({ folder: './config' })],
})
export class UserModule {
}