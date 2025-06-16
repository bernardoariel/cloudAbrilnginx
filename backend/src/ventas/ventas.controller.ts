import { Controller, Get, Param } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Abril-SqlServer')
@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Get()
  findAll() {
    return this.ventasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ventasService.findOne(+id);
  }


}
