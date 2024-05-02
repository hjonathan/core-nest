import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    PassportModule,
    JwtModule.register({
      secret: 'secreto',
      signOptions: { expiresIn: 200 },
    }),],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
