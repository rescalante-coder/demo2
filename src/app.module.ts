import { Module } from '@nestjs/common';
import { ArtistasModule } from './artistas/artistas.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CancionesModule } from './canciones/canciones.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
     TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,  
    }),
    ArtistasModule,
    CancionesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
