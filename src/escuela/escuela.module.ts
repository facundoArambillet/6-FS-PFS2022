import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudad } from 'src/ciudad/ciudad.entity';
import Clase from 'src/clase/clase.entity';
import { EscuelaController } from './escuela.controller';
import { Escuela } from './escuela.entity';
import { EscuelaService } from './escuela.service';

@Module({
  imports : [
    TypeOrmModule.forFeature(
      [
        Escuela,Ciudad,Clase
      ]
    )
  ],
  controllers: [EscuelaController],
  providers: [EscuelaService]
})
export class EscuelaModule {}
