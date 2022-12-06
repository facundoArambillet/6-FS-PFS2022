import { Controller, Get, Param } from '@nestjs/common';
import { ProfesorService } from './profesor.service';

@Controller('profesor')
export class ProfesorController {
    constructor(private profesor : ProfesorService) {}
    @Get()
    public getAll() {
        return this.profesor.getAll();
    }
    @Get(":id")
    public getById(@Param("id") id : number) {
        return this.profesor.getById(id);
    }
}