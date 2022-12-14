import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CiudadDTO } from './ciudad.dto';
import { Ciudad } from './ciudad.entity';
import { CiudadService } from './ciudad.service';

@Controller('ciudad')
export class CiudadController {
    constructor(private ciudadService : CiudadService) {}
    @Get()
    public getAll(): Promise<Ciudad[]> {
        return this.ciudadService.getAll();
    }
    @Get("ciudades/:orden")
    public getAllOnlyCiudad(@Param("orden") orden : string): Promise<Ciudad[]> {
        return this.ciudadService.getAllOnlyCiudades(orden);
    }
    @Get(":id")
    public getById(@Param("id") id : number): Promise<Ciudad> {
        return this.ciudadService.getById(id);
    }
    // @Get(":ultimoID")
    // public ultimoID(): Promise<number> {
    //     return this.ciudadService.ultimoId();
    // }
    @Post()
    public addCiudad(@Body() ciudad : CiudadDTO): Promise<Ciudad>{
    return this.ciudadService.addCiudad(ciudad);
    }
    @Put(":idCiudad")
    public updateCiudad (@Param("idCiudad") id: number,@Body() ciudad: CiudadDTO): Promise<Ciudad> {
        return this.ciudadService.updateCiudad(id,ciudad);
    }
    @Delete(":idCiudad")
    public deleteCiudad(@Param("idCiudad") id: number): Promise<boolean> {
        return this.ciudadService.deleteCiudad(id);
    }
   
}
