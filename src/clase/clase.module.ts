import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Escuela } from 'src/escuela/escuela.entity';
import { Estudiante } from 'src/estudiante/estudiante.entity';
import { Profesor } from 'src/profesor/profesor.entity';
import { ClaseController } from './clase.controller';
import Clase from './clase.entity';
import { ClaseService } from './clase.service';

@Module({
  imports : [
    TypeOrmModule.forFeature(
      [
        Clase,Escuela,Profesor,Estudiante
      ]
    )
  ],
  controllers: [ClaseController],
  providers: [ClaseService]
})
export class ClaseModule {}
