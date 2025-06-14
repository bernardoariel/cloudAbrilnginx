import { Body, Controller, Post } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { SendTextDto } from './dto/send-text.dto';

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
    templateName: string; 
    languageCode: string; 
    components: any[] 
  }) {
    return this.whatsappService.sendTemplateMessage(
      body.to, 
      body.templateName, 
      body.languageCode, 
      body.components
    );
  }
}
