import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import config from './config/keys';

@Module({
  imports: [AuthModule, MongooseModule.forRoot(config.mongoURI), EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
