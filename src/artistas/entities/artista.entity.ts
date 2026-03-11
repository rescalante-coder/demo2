import { Cancione } from "src/canciones/entities/cancione.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Artista {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()   
    pais: string;

    @Column()
    genero: string;

    @Column()
    anioDebut: number;

    @Column()
    rol: string;

    @Column({ select: false })
    password: string;

    @OneToMany(() => Cancione, (cancion) => cancion.artista)
    canciones: Cancione[];
}
