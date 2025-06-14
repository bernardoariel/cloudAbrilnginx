import { IsString, Matches } from "class-validator";

export class SendTextDto{
    @IsString()
    @Matches(/^54\d{10,11}$/, {
        message: 'El número debe comenzar con 54 y tener 12 o 13 dígitos',
})
    to: string;
    @IsString()
    message: string;
}