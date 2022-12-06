import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {FindOneOptions, Repository} from "typeorm";
import { Escuela } from './escuela.entity';

@Injectable()
export class EscuelaService {
    private escuelas : Escuela[] = [];
    constructor (@InjectRepository(Escuela)
    private readonly escuelaRepository : Repository<Escuela>) {}

    public async getAll (): Promise<Escuela[]> {
        let escuelas : Escuela[] = await this.escuelaRepository.find();
        return escuelas;
    }

    
    public async getById (id: number): Promise<Escuela> {
        try {
            const criterio : FindOneOptions = {where :{idEscuela : id}}
            let escuela : Escuela = await this.escuelaRepository.findOne(criterio);
            if(escuela) {
                return escuela;
            }
            else {
                throw new Error("La escuela no se encuentra") // No me reconoce el Exception
            }
        } catch (error) {
            throw new HttpException({status: HttpStatus.NOT_FOUND, error: `Error en la busqueda de escuela ${id}: ${error}`},
            HttpStatus.NOT_FOUND)
        }

    }
   
}