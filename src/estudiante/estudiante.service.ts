import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EscuelaDTO } from 'src/escuela/escuela.dto';
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { EstudianteDTO } from './estudiante.dto';
import { Estudiante } from './estudiante.entity';

@Injectable()
export class EstudianteService {
    private estudiantes: Estudiante[] = [];
    constructor(@InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>) { }

    public async getAll(): Promise<Estudiante[]> {
        this.estudiantes = await this.estudianteRepository.find();
        return this.estudiantes;
    }


    public async getById(id: number): Promise<Estudiante> {
        try {
            const criterio: FindOneOptions = { where: { idEstudiante: id } };
            let estudiante: Estudiante = await this.estudianteRepository.findOne(criterio);
            if (estudiante) {
                return estudiante;
            }
            else {
                throw new Error("El estudiante no se encuentra") // No me reconoce el Exception
            }
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la busqueda del estudiante ${id}: ${error}` },
                HttpStatus.NOT_FOUND);
        }

    }

    public async addEstudiante(estudianteDTO: EstudianteDTO): Promise<Estudiante> {
        try {
            let estudiante: Estudiante = await this.estudianteRepository.save(new Estudiante(
                 estudianteDTO.apellidoNombres, estudianteDTO.fechaNacimiento
                
            ));
            if (estudiante)
                return estudiante;
            else
                throw new Error('No se pudo crear El estudiante');
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en la creacion de estudiante ' + error
            }, HttpStatus.NOT_FOUND);
        }
    }

    public async updateEstudiante(id: number,estudianteDTO: EstudianteDTO): Promise<Estudiante> {
        try {
            let criterio: FindOneOptions = { where: { idEstudiante: id } };
            let estudiante: Estudiante = await this.estudianteRepository.findOne(criterio);
            if (!estudiante)
                throw new Error('No se encuentra el estudiante');
            else {
                estudiante.setFechaNacimiento(estudianteDTO.fechaNacimiento);
                estudiante.setNombre(estudianteDTO.apellidoNombres);
                estudiante = await this.estudianteRepository.save(estudiante);
                return estudiante;
            }


        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en la actualizacion del estudiante ' + error
            }, HttpStatus.NOT_FOUND);
        }
    }

    public async deleteEstudiante(id: number): Promise<boolean> {
        try {
            let criterio: FindOneOptions = { where: { idEstudiante: id } };
            let estudiante: Estudiante = await this.estudianteRepository.findOne(criterio);
            if (!estudiante) {
                throw new Error('No se encuentra el estudiante');
            }

            else {
                await this.estudianteRepository.delete(estudiante.getIdEstudiante());
                return true;
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en la eliminacion de escuela ' + error
            }, HttpStatus.NOT_FOUND);
        }
    }

}
