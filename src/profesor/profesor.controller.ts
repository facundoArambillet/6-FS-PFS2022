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
    @Get(":id")
    public getById(@Param("id") id : number): Promise<Profesor> {
        return this.profesorService.getById(id);
    }
    @Post()
    public addEscuela(@Body() profesor : ProfesorDTO): Promise<Profesor>{
    return this.profesorService.addProfesor(profesor);
    }
    @Put()
    public updateEscuela(@Body() profesor: ProfesorDTO): Promise<Profesor> {
        return this.profesorService.updateProfesor(profesor);
    }
    @Delete()
    public deleteEscuela(@Body() profesor: ProfesorDTO): Promise<boolean> {
        return this.profesorService.deleteProfesor(profesor);
    }
}