import { Module } from '@nestjs/common';
import { ArtistasService } from './artistas.service';
import { ArtistasController } from './artistas.controller';
import { Artista } from './entities/artista.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Artista])],
  controllers: [ArtistasController],
  providers: [ArtistasService],
  exports: [ArtistasService]
})
export class ArtistasModule {}
