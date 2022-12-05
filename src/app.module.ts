import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CiudadModule } from './ciudad/ciudad.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname,"..","client")}),
    TypeOrmModule.forRoot(
      {
        "type": "mysql",
        "host": "localhost",
        "port": 3306,
        "username": "root",
        "password": "123456789"
       ,
        "database": "escolar",
        "entities": [
        "dist/**/**.entity{.ts,.js}"
        ],
        "synchronize": false
      }),
    CiudadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
