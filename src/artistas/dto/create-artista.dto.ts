import { IsNumber, IsString, Min, MinLength } from "class-validator";

export class CreateArtistaDto {
        @IsString()
        nombre: string;
    
        @IsString()
        pais: string;
    
        @IsString()
        genero: string;
    
        @IsNumber()
        anioDebut: number;
    
        @IsString() 
        rol: string;
    
        @IsString()
        @MinLength(5)
        password: string;
}
