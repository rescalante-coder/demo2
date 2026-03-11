import { Artista } from "src/artistas/entities/artista.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Cancione {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    duracion: number;

    @Column()
    album: string;

    @Column()
    anioLanzamiento: number;

    @Column({ default: 0 })
    reproducciones: number;

    @ManyToOne(() => Artista, (artista) => artista.canciones)
    @JoinColumn({ name: 'artistaId' })
    artista: Artista;

    @Column()
    artistaId: number;
}

