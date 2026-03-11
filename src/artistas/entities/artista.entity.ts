import { Cancione } from "src/canciones/entities/cancione.entity";
import { Rol } from "src/enums/rol.enum";
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

    @Column({
        type: 'enum',
        enum: Rol,
        default: Rol.ARTISTA, // Valor por defecto opcional
    })
    rol: Rol;

    @Column({ select: false })
    password: string;

    @OneToMany(() => Cancione, (cancion) => cancion.artista)
    canciones: Cancione[];
}
