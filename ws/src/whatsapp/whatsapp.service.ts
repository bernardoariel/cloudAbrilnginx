import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WhatsappService {
    private apiUrl = `https://graph.facebook.com/v22.0/662944993549366/messages`
    private headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
    }

    async sendTextMessage(to:string, message: string){
       
        const data = {
            messaging_product: 'whatsapp',
            to,
            type: 'text',
            text: {
                body: message,
            },
        }
        const response = await axios.post(this.apiUrl, data, { headers: this.headers });
        return response.data;
    }
    async sendImageMessage(to: string, link: string) {
        const data = {
            messaging_product: 'whatsapp',
            to,
            type: 'image',
            image: {
            link,
            },
        };
        const response = await axios.post(this.apiUrl, data, { headers: this.headers });
        return response.data;
    }

    async sendVideoMessage(to: string, link: string) {
        const data = {
            messaging_product: 'whatsapp',
            to,
            type: 'video',
            video: {
            link,
            },
        };
        const response = await axios.post(this.apiUrl, data, { headers: this.headers });
        return response.data;
    }


    async sendAudioMessage(to: string, link: string) {
        const data = {
            messaging_product: 'whatsapp',
            to,
            type: 'audio',
            audio: {
            link,
            },
        };
        const response = await axios.post(this.apiUrl, data, { headers: this.headers });
        return response.data;
    }
    async sendDocumentMessage(to: string, link: string, filename?: string) {
        const data = {
            messaging_product: 'whatsapp',
            to,
            type: 'document',
            document: {
            link,
            ...(filename ? { filename } : {}),
            },
        };
        const response = await axios.post(this.apiUrl, data, { headers: this.headers });
        return response.data;
    }

    async sendTemplateMessage(to: string, templateName: string, languageCode: string, components: any[]) {
        const data = {
            messaging_product: 'whatsapp',
            to,
            type: 'template',
            template: {
            name: templateName,
            language: {
                code: languageCode,
            },
            components,
            },
        };
        const response = await axios.post(this.apiUrl, data, { headers: this.headers });
        return response.data;
    }
    
}
  