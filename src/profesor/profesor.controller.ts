import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProfesorDTO } from './profesor.dto';
import { Profesor } from './profesor.entity';
import { ProfesorService } from './profesor.service';

@Controller('profesor')
export class ProfesorController {
    constructor(private profesorService : ProfesorService) {}
    @Get()
    public getAll(): Promise<Profesor[]> {
        return this.profesorService.getAll();
    }
    @Get("profesores/:orden")
    public getAllOnlyProfesores(@Param("orden") orden : string): Promise<Profesor[]> {
        return this.profesorService.getAllOnlyProfesores(orden);
    }
    @Get(":id")
    public getById(@Param("id") id : number): Promise<Profesor> {
        return this.profesorService.getById(id);
    }
    @Post()
    public addEscuela(@Body() profesor : ProfesorDTO): Promise<Profesor>{
    return this.profesorService.addProfesor(profesor);
    }
    @Put(":idEscuela")
    public updateEscuela(@Param("idEscuela") id: number,@Body() profesor: ProfesorDTO): Promise<Profesor> {
        return this.profesorService.updateProfesor(id,profesor);
    }
    @Delete(":idEscuela")
    public deleteEscuela(@Param("idEscuela") id: number,): Promise<boolean> {
        return this.profesorService.deleteProfesor(id);
    }
}