import { Module } from '@nestjs/common';
import { FormaPagoService } from './forma-pago.service';
import { FormaPagoController } from './forma-pago.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormaPago } from './entities/forma-pago.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormaPago], 'sqlserverConnection')],
  controllers: [FormaPagoController],
  providers: [FormaPagoService],
  exports:[TypeOrmModule]
})
export class FormaPagoModule {}
