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
    @Get(":idEstudiante")
    public getById(@Param("idEstudiante") id : number): Promise<Estudiante> {
        return this.estudianteService.getById(id);
    }
    @Post()
    public addEscuela(@Body() estudiante : EstudianteDTO): Promise<Estudiante>{
    return this.estudianteService.addEstudiante(estudiante);
    }
    @Put(":idEstudiante")
    public updateEscuela(@Param("idEstudiante") id: number, @Body() estudiante: EstudianteDTO): Promise<Estudiante> {
        return this.estudianteService.updateEstudiante(id,estudiante);
    }
    @Delete(":idEstudiante")
    public deleteEscuela(@Param("idEstudiante") id: number): Promise<boolean> {
        return this.estudianteService.deleteEstudiante(id);
    }
}