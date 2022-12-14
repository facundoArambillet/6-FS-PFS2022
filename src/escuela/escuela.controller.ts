import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EscuelaDTO } from './escuela.dto';
import { Escuela } from './escuela.entity';
import { EscuelaService } from './escuela.service';

@Controller('escuela')
export class EscuelaController {
    constructor(private escuelaService : EscuelaService) {}
    @Get()
    public getAll(): Promise<Escuela[]> {
        return this.escuelaService.getAll();
    }
    @Get("/escuelas/:orden")
    public getAllOnlyEscuelas(@Param("orden") orden : string): Promise<Escuela[]> {
        return this.escuelaService.getAllOnlyEscuelas(orden);
    }
    @Get(":idEscuela")
    public getById(@Param("idEscuela") id : number): Promise<Escuela> {
        return this.escuelaService.getById(id);
    }
    @Post()
    public addEscuela(@Body() escuela : EscuelaDTO): Promise<Escuela>{
    return this.escuelaService.addEscuela(escuela);
    }
    @Put(":idEscuela")
    public updateEscuela(@Param("idEscuela") id: number, @Body() escuela: EscuelaDTO): Promise<Escuela> {
        return this.escuelaService.updateEscuela(id,escuela);
    }
    @Delete(":idEscuela")
    public deleteEscuela(@Param("idEscuela") id : number): Promise<boolean> {
        return this.escuelaService.deleteEscuela(id);
    }
}