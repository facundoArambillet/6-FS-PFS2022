import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EstudianteDTO } from './estudiante.dto';
import { Estudiante } from './estudiante.entity';
import { EstudianteService } from './estudiante.service';

@Controller("estudiante")
export class EstudianteController {
    constructor(private estudianteService : EstudianteService) {}
    @Get()
    public getAll(): Promise<Estudiante[]> {
        return this.estudianteService.getAll();
    }
    @Get(":id")
    public getById(@Param("id") id : number): Promise<Estudiante> {
        return this.estudianteService.getById(id);
    }
    @Post()
    public addEscuela(@Body() estudiante : EstudianteDTO): Promise<Estudiante>{
    return this.estudianteService.addEstudiante(estudiante);
    }
    @Put()
    public updateEscuela(@Body() estudiante: EstudianteDTO): Promise<Estudiante> {
        return this.estudianteService.updateEstudiante(estudiante);
    }
    @Delete()
    public deleteEscuela(@Body() estudiante: EstudianteDTO): Promise<boolean> {
        return this.estudianteService.deleteEstudiante(estudiante);
    }
}