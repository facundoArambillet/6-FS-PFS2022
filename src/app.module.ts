import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CiudadModule } from './ciudad/ciudad.module';
import { EscuelaModule } from './escuela/escuela.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ProfesorModule } from './profesor/profesor.module';
import { ClaseModule } from './clase/clase.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname,"..","client")}),
    TypeOrmModule.forRoot(
      {
        "type": "mysql",
        "host": "localhost",
        "port": 3306,
        "username": "root",
        "password": "123456789",
        "database": "escolar",
        "entities": [
        "dist/**/**.entity{.ts,.js}"
        ],
        "synchronize": false
      }),
    CiudadModule,
    EscuelaModule,
    EstudianteModule,
    ProfesorModule,
    ClaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
