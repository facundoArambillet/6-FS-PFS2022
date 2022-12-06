import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {FindOneOptions, Repository} from "typeorm";
import { Profesor } from './profesor.entity';

@Injectable()
export class ProfesorService {
    private profesores : Profesor[] = [];
    constructor (@InjectRepository(Profesor)
    private readonly profesorRepository : Repository<Profesor>) {}

    public async getAll (): Promise<Profesor[]> {
        let profesores : Profesor[] = await this.profesorRepository.find();
        return profesores;
    }

    
    public async getById (id: number): Promise<Profesor> {
        try {
            const criterio : FindOneOptions = {where :{idProfesor : id}}
            let profesor : Profesor = await this.profesorRepository.findOne(criterio);
            if(profesor) {
                return profesor;
            }
            else {
                throw new Error("El profesor no se encuentra") // No me reconoce el Exception
            }
        } catch (error) {
            throw new HttpException({status: HttpStatus.NOT_FOUND, error: `Error en la busqueda de profesor ${id}: ${error}`},
            HttpStatus.NOT_FOUND)
        }

    }
   
}
