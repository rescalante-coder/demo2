import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo artista' })
  @ApiResponse({ status: 201, description: 'El artista ha sido creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o el nombre ya existe.' })
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK) // Cambia el status por defecto de 201 a 200 para el login
  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión para obtener el token JWT' })
  @ApiResponse({ status: 200, description: 'Login exitoso, devuelve el access_token.' })
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas.' })
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
