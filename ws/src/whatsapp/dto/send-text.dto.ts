import { IsString, Matches } from "class-validator";

export class SendTextDto {
    to: string;
    message: string;
}

export class AvisoCompraDto {
    to: string;
    template: {
        name: string;
        language: { code: string };
        components: Array<{
            type: string;
            parameters: Array<{
                type: string;
                parameter_name: string;
                text: string;
            }>;
        }>;
    };
}

export class AvisoPagoDto {
    to: string;
    template: {
        name: string;
        language: { code: string };
        components: Array<{
            type: string;
            parameters: Array<{
                type: string;
                parameter_name: string;
                text: string;
            }>;
        }>;
    };
}