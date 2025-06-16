import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Usuario], 'sqlserverConnection')
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [TypeOrmModule],
})
export class UsuariosModule {}
