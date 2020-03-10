import { Module } from '@nestjs/common';
import { ModuleList } from './modules/module-list.module';
import { ConfigModule } from './config/config.module';
import { AppController } from './app.controller';

@Module({
  imports: [ 
    ConfigModule.register({ folder: './config' }),
    ModuleList
  ],
  controllers: [AppController],
})

export class AppStart {}
