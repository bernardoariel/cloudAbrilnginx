import { Body, Controller, Post } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { SendTextDto, AvisoCompraDto, AvisoPagoDto } from './dto/send-text.dto';

@Controller('whatsapp')
export class WhatsappController {
    constructor(private readonly whatsappService:WhatsappService){}

    @Post('text')
    async sendTextMessage(@Body() body:SendTextDto) {
        return this.whatsappService.sendTextMessage(body.to, body.message);
    }
    
    @Post('image')
    sendImage(@Body() body: { to: string; link: string }) {
        return this.whatsappService.sendImageMessage(body.to, body.link);
    }
    @Post('video')
    sendVideo(@Body() body: { to: string; link: string }) {
        return this.whatsappService.sendVideoMessage(body.to, body.link);
    }
     @Post('audio')
  sendAudio(@Body() body: { to: string; link: string }) {
    return this.whatsappService.sendAudioMessage(body.to, body.link);
  }

  @Post('document')
  sendDocument(@Body() body: { to: string; link: string; filename?: string }) {
    return this.whatsappService.sendDocumentMessage(body.to, body.link, body.filename);
  }

  @Post('template')
  sendTemplate(@Body() body: { 
    to: string; 
    template: {
      name: string;
      language: { code: string };
      components: any[];
    }
  }) {
    return this.whatsappService.sendTemplateMessage(
      body.to, 
      body.template.name, 
      body.template.language.code, 
      body.template.components
    );
  }

  @Post('template/aviso_compra_abril')
  sendAvisoCompra(@Body() body: AvisoCompraDto) {
    return this.whatsappService.sendTemplateMessage(
      body.to, 
      body.template.name, 
      body.template.language.code, 
      body.template.components
    );
  }

  @Post('template/aviso_pago')
  sendAvisoPago(@Body() body: AvisoPagoDto) {
    return this.whatsappService.sendTemplateMessage(
      body.to, 
      body.template.name, 
      body.template.language.code, 
      body.template.components
    );
  }
}
