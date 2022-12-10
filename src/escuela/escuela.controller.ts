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
    @Get(":id")
    public getById(@Param("id") id : number): Promise<Escuela> {
        return this.escuelaService.getById(id);
    }
    @Post()
    public addEscuela(@Body() escuela : EscuelaDTO): Promise<Escuela>{
    return this.escuelaService.addEscuela(escuela);
    }
    @Put()
    public updateEscuela(@Body() escuela: EscuelaDTO): Promise<Escuela> {
        return this.escuelaService.updateEscuela(escuela);
    }
    @Delete()
    public deleteEscuela(@Body() escuela: EscuelaDTO): Promise<boolean> {
        return this.escuelaService.deleteEscuela(escuela);
    }
}