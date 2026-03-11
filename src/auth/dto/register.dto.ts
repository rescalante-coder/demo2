import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString, Min, MinLength } from "class-validator";
import { Rol } from "src/enums/rol.enum";

export class RegisterDto {
        @IsString()
        nombre: string;
    
        @IsString()
        pais: string;
    
        @IsString()
        genero: string;
    
        @IsNumber()
        anioDebut: number;
    
        @ApiProperty({ enum: Rol, example: Rol.ARTISTA })
        @IsEnum(Rol, {
                message: 'El rol debe ser: admin o artista'
        })
        rol: Rol;
    
        @IsString()
        @MinLength(5)
        password: string;
}
