import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenService } from './token.service';
import { TokenSchema } from './schemas/user-token.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: `Token`, schema: TokenSchema }]),
    ],
    providers: [TokenService],
    exports: [TokenService],
})
export class TokenModule {}
