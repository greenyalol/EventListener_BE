import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from 'src/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import keys from 'src/config/keys';


@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), UsersModule, PassportModule,
    JwtModule.register({
        secret: keys.jwt_secret,
        signOptions: { expiresIn: '3600s' },
    }),],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {

}
