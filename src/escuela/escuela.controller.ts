import { Controller, Get, Param } from '@nestjs/common';
import { EscuelaService } from './escuela.service';

@Controller('escuela')
export class EscuelaController {
    constructor(private escuela : EscuelaService) {}
    @Get()
    public getAll() {
        return this.escuela.getAll();
    }
    @Get(":id")
    public getById(@Param("id") id : number) {
        return this.escuela.getById(id);
    }
}