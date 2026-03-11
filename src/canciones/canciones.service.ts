import { Injectable } from '@nestjs/common';
import { CreateCancioneDto } from './dto/create-cancione.dto';
import { UpdateCancioneDto } from './dto/update-cancione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cancione } from './entities/cancione.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CancionesService {
  constructor(@InjectRepository(Cancione) private cancionesRepository: Repository<Cancione>) {}

  async create(createCancioneDto: CreateCancioneDto) {
    const cancione = this.cancionesRepository.create(createCancioneDto);
    return await this.cancionesRepository.save(cancione);
  }

  async findAll() {
    return await this.cancionesRepository.find();
  }

  async findOne(id: number) {
    return await this.cancionesRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCancioneDto: UpdateCancioneDto) {
    await this.cancionesRepository.update(id, updateCancioneDto);
    return await this.findOne(id);  
  }

  async remove(id: number) {
    const cancione = await this.findOne(id);
    if (cancione) {
      await this.cancionesRepository.remove(cancione);
    }
  }
}
