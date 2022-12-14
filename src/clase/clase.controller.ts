import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import ClaseDTO from './clase.dto';
import Clase from './clase.entity';
import { ClaseService } from './clase.service';

@Controller('clase')
export class ClaseController {
    constructor(private claseService : ClaseService) {}
    @Get()
    public getAll(): Promise<Clase[]> {
        return this.claseService.getAll();
    }
    @Get(":id")
    public getById(@Param("id") id : number): Promise<Clase> {
        return this.claseService.getById(id);
    }
    @Post()
    public addCiudad(@Body() clase : ClaseDTO): Promise<Clase>{
    return this.claseService.addClase(clase);
    }
    @Put(":idClase")
    public updateCiudad (@Param("idClase") id: number,@Body() clase: ClaseDTO): Promise<Clase> {
        return this.claseService.updateClase(id,clase);
    }
    @Delete(":idClase")
    public deleteCiudad(@Param("idClase") id: number): Promise<boolean> {
        return this.claseService.deleteClase(id);
    }
}
