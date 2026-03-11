import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ArtistasService } from 'src/artistas/artistas.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly artistasService: ArtistasService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Verificar si el nombre ya existe
    const artistaExistente = await this.artistasService.findOneByNombre(registerDto.nombre);
    if (artistaExistente) {
      throw new BadRequestException('El nombre de artista ya está en uso');
    }

    // Encriptar password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Guardar en la base de datos
    return await this.artistasService.create({
      ...registerDto,
      password: hashedPassword,
    });
  }

  async login(loginDto: LoginDto) {
    // Buscar al artista incluyendo el campo password (que tiene select: false)
    const artista = await this.artistasService.findOneByNombreWithPassword(loginDto.nombre);
    
    if (!artista) {
      throw new UnauthorizedException('Nombre de artista inválido');
    }

    // Comparar passwords
    const isPasswordValid = await bcrypt.compare(loginDto.password, artista.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    // Generar el Payload del JWT
    const payload = { id: artista.id, nombre: artista.nombre, rol: artista.rol };

    return {
      nombre: artista.nombre,
      rol: artista.rol,
      token: await this.jwtService.signAsync(payload),
    };
  }


}
