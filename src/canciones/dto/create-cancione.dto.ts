import { IsInt, IsPositive, IsString, Min } from "class-validator";

export class CreateCancioneDto {
    @IsString()
    titulo: string;

    @IsInt()
    @IsPositive()
    duracion: number; // Duración en segundos

    @IsString()
    album: string;

    @IsInt()
    @Min(1900)
    anioLanzamiento: number;

    @IsInt()
    @IsPositive()
    artistaId: number; // El ID del artista al que pertenece    
}
