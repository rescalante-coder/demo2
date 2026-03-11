import { Module } from '@nestjs/common';
import { CancionesService } from './canciones.service';
import { CancionesController } from './canciones.controller';
import { Cancione } from './entities/cancione.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Cancione])],
  controllers: [CancionesController],
  providers: [CancionesService],
})
export class CancionesModule {}
