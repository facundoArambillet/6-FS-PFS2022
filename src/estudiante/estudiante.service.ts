import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {FindOneOptions, Repository} from "typeorm";
import { Estudiante } from './estudiante.entity';

@Injectable()
export class EstudianteService {
    private estudiantes : Estudiante[] = [];
    constructor (@InjectRepository(Estudiante)
    private readonly estudianteRepository : Repository<Estudiante>) {}

    public async getAll (): Promise<Estudiante[]> {
        let estudiantes : Estudiante[] = await this.estudianteRepository.find();
        return estudiantes;
    }

    
    public async getById (id: number): Promise<Estudiante> {
        try {
            const criterio : FindOneOptions = {where :{idEstudiante : id}}
            let estudiante : Estudiante = await this.estudianteRepository.findOne(criterio);
            if(estudiante) {
                return estudiante;
            }
            else {
                throw new Error("El estudiante no se encuentra") // No me reconoce el Exception
            }
        } catch (error) {
            throw new HttpException({status: HttpStatus.NOT_FOUND, error: `Error en la busqueda del estudiante ${id}: ${error}`},
            HttpStatus.NOT_FOUND)
        }

    }
   
}
