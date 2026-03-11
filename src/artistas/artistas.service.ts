import { Injectable } from '@nestjs/common';
import { CreateArtistaDto } from './dto/create-artista.dto';
import { UpdateArtistaDto } from './dto/update-artista.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artista } from './entities/artista.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistasService {
  constructor(@InjectRepository(Artista) private artistaRepository: Repository<Artista>) {}

  async create(createArtistaDto: CreateArtistaDto) {
    const artista = this.artistaRepository.create(createArtistaDto);
    return await this.artistaRepository.save(artista);
  }

  async findAll() {
    return await this.artistaRepository.find();
  }

  async findOne(id: number) {
    return await this.artistaRepository.findOneBy({ id });
  }

  async update(id: number, updateArtistaDto: UpdateArtistaDto) {
    return await this.artistaRepository.update({ id }, updateArtistaDto);
  }

  async remove(id: number) {
    return await this.artistaRepository.delete({ id });
  }

  async findOneByNombreWithPassword(nombre: string) {
    return await this.artistaRepository.findOne({
      where: { nombre },
      select: ['id', 'nombre', 'password', 'rol'], // Forzamos la selección del password
    });
  }

  async findOneByNombre(nombre: string) {
    return await this.artistaRepository.findOneBy({ nombre });
  }
}
