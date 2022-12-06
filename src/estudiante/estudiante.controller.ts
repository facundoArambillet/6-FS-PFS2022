import { Controller, Get, Param } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';

@Controller('estudiante')
export class EstudianteController {
    constructor(private estudiante : EstudianteService) {}
    @Get()
    public getAll() {
        return this.estudiante.getAll();
    }
    @Get(":id")
    public getById(@Param("id") id : number) {
        return this.estudiante.getById(id);
    }
}