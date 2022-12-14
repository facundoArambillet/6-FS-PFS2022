import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {FindManyOptions, FindOneOptions, Repository} from "typeorm";
import { ProfesorDTO } from './profesor.dto';
import { Profesor } from './profesor.entity';

@Injectable()
export class ProfesorService {
    private profesores : Profesor[] = [];
    constructor (@InjectRepository(Profesor)
    private readonly profesorRepository : Repository<Profesor>) {}

    public async getAll (): Promise<Profesor[]> {
        let criterio: FindManyOptions = { relations: ["clases"] }
        this.profesores = await this.profesorRepository.find(criterio);
        return this.profesores;
    }

    public async getAllOnlyProfesores (orden: string): Promise<Profesor[]> {
        let criterio: FindManyOptions = { order : {
            apellidoNombres : "ASC"
        } }
        this.profesores = await this.profesorRepository.find(criterio);
        return this.profesores;
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

    public async addProfesor(profesorDTO: ProfesorDTO): Promise<Profesor> {
        try {
            let profesor: Profesor = await this.profesorRepository.save(new Profesor(
                 profesorDTO.apellidoNombres
            ));
            if (profesor)
                return profesor;
            else
                throw new Error('No se pudo crear El profesor');
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en la creacion de profesor ' + error
            }, HttpStatus.NOT_FOUND);
        }
    }

    public async updateProfesor(id: number,profesorDTO: ProfesorDTO): Promise<Profesor> {
        try {
            let criterio: FindOneOptions = { where: { idProfesor: id } };
            let profesor: Profesor = await this.profesorRepository.findOne(criterio);
            if (!profesor)
                throw new Error('No se encuentra el Profesor');
            else {
                profesor.setNombre(profesorDTO.apellidoNombres);
                profesor = await this.profesorRepository.save(profesor);
                return profesor;
            }

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en la actualizacion del profesor ' + error
            }, HttpStatus.NOT_FOUND);
        }
    }

    public async deleteProfesor(id: number): Promise<boolean> {
        try {
            let criterio: FindOneOptions = { where: {idProfesor: id } };
            let profesor: Profesor = await this.profesorRepository.findOne(criterio);
            if (!profesor) {
                throw new Error('No se encuentra el Profesor');
            }

            else {
                await this.profesorRepository.delete(profesor.getIdProfesor());
                return true;
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en la eliminacion del profesor ' + error
            }, HttpStatus.NOT_FOUND);
        }
    }
   
}
