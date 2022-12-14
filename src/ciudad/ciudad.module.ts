import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Escuela } from 'src/escuela/escuela.entity';
import { CiudadController } from './ciudad.controller';
import { Ciudad } from './ciudad.entity';
import { CiudadService } from './ciudad.service';

@Module({
  imports : [
    TypeOrmModule.forFeature(
      [
        Ciudad,Escuela
      ]
    )
  ],
  controllers: [CiudadController],
  providers: [CiudadService]
})
export class CiudadModule {}
