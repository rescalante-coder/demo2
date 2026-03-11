import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ArtistasModule } from 'src/artistas/artistas.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constants';

@Module({
  imports: [
    ArtistasModule, 
    PassportModule, 
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
