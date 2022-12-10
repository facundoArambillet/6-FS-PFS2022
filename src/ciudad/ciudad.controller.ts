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
    @Get(":id")
    public getById(@Param("id") id : number): Promise<Ciudad> {
        return this.ciudadService.getById(id);
    }
    @Post()
    public addCiudad(@Body() ciudad : CiudadDTO): Promise<Ciudad>{
    return this.ciudadService.addCiudad(ciudad);
    }
    @Put()
    public updateCiudad(@Body() ciudad: CiudadDTO): Promise<Ciudad> {
        return this.ciudadService.updateCiudad(ciudad);
    }
    @Delete()
    public deleteCiudad(@Body() ciudad: CiudadDTO): Promise<boolean> {
        return this.ciudadService.deleteCiudad(ciudad);
    }
   
}
