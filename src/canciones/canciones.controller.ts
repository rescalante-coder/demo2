import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CancionesService } from './canciones.service';
import { CreateCancioneDto } from './dto/create-cancione.dto';
import { UpdateCancioneDto } from './dto/update-cancione.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Rol } from 'src/enums/rol.enum';

@ApiBearerAuth()
//@UseGuards(JwtAuthGuard, RolesGuard) // Protegemos todas las rutas del controlador con JWT
@Controller('canciones')
export class CancionesController {
  constructor(private readonly cancionesService: CancionesService) {}


  @Post()
  //@Roles(Rol.ADMIN, Rol.ARTISTA) // Solo ADMIN y ARTISTA pueden crear canciones
  create(@Body() createCancioneDto: CreateCancioneDto, @Request() req) {
    // --- LOGS DE DEPURACIÓN ---
  console.log('--- Datos del Token (req.user) ---');
  console.log(req.user);
  console.log('--- Datos del Body (createCancioneDto) ---');
  console.log(createCancioneDto);
  // --------------------------
    if(req.user.rol === Rol.ARTISTA) {
      createCancioneDto.artistaId = req.user.id; // Asignamos el ID del artista al crear la canción
    }

  console.log('--- DTO después de asignar artistaId ---');
  console.log(createCancioneDto);

    return this.cancionesService.create(createCancioneDto);
  }

  @Get()
  //@Roles(Rol.ADMIN, Rol.ARTISTA) // ADMIN y ARTISTA pueden ver canciones
  findAll(@Request() req) {
    
    if(req.user.rol === Rol.ARTISTA) {
      return this.cancionesService.findAllByArtista(req.user.id); // Solo devuelve canciones del artista logueado
    }
    return this.cancionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cancionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCancioneDto: UpdateCancioneDto) {
    return this.cancionesService.update(+id, updateCancioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cancionesService.remove(+id);
  }
}
