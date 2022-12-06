import { Controller, Get, Param } from '@nestjs/common';
import { CiudadService } from './ciudad.service';

@Controller('ciudad')
export class CiudadController {
    constructor(private ciudad : CiudadService) {}
    @Get()
    public getAll() {
        return this.ciudad.getAll();
    }
    @Get(":id")
    public getById(@Param("id") id : number) {
        return this.ciudad.getById(id);
    }
}
