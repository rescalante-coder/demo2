import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ArtistasService } from './artistas.service';
import { CreateArtistaDto } from './dto/create-artista.dto';
import { UpdateArtistaDto } from './dto/update-artista.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Rol } from 'src/enums/rol.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('artistas')
@ApiBearerAuth('access-token')
//@UseGuards(JwtAuthGuard, RolesGuard) // Aplicamos ambos guards a nivel controlador
@Controller('artistas')
export class ArtistasController {
  constructor(private readonly artistasService: ArtistasService) {}

  //@Roles(Rol.ADMIN) // Solo ADMIN puede crear artistas
  @Post()
  create(@Body() createArtistaDto: CreateArtistaDto) {
    return this.artistasService.create(createArtistaDto);
  }

  //@Roles(Rol.ADMIN) // ADMIN puede ver artistas
  @Get()
  findAll() {
    return this.artistasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtistaDto: UpdateArtistaDto) {
    return this.artistasService.update(+id, updateArtistaDto);
  }

  @Roles(Rol.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artistasService.remove(+id);
  }
}
