import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import ClaseDTO from './clase.dto';
import Clase from './clase.entity';

@Injectable()
export class ClaseService {
    private clases: Clase[] = [];
    constructor(@InjectRepository(Clase)
    private readonly claseRepository: Repository<Clase>) { }

    public async getAll(): Promise<Clase[]> {
        let criterio : FindManyOptions = { relations: [ 'escuela' ,"profesor"] }
        this.clases = await this.claseRepository.find(criterio);
        return this.clases;
    }


    public async getAllOnlyClases(): Promise<Clase[]> {
        this.clases = await this.claseRepository.find();
        return this.clases;
    }

    public async getById(id: number): Promise<Clase> {
        try {
            const criterio: FindOneOptions = { where: { idClase: id } }
            let clase: Clase = await this.claseRepository.findOne(criterio);
            if (clase) {
                return clase;
            }
            else {
                throw new Error("La Clase no se encuentra") // No me reconoce el Exception
            }
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la busqueda de clase ${id}: ${error}` },
                HttpStatus.NOT_FOUND)
        }

    }

    public async addClase(claseDTO: ClaseDTO): Promise<Clase> {
        try {
            let clase: Clase = await this.claseRepository.save(new Clase(
                 claseDTO.nombre, claseDTO.idEscuela, claseDTO.idProfesor
            ));
            if (clase)
                return clase;
            else
                throw new Error('No se pudo crear la clase');
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en la creacion de clase ' + error
            }, HttpStatus.NOT_FOUND);
        }
    }

    public async updateClase(id: number,claseDTO: ClaseDTO): Promise<Clase> {
        try {
            let criterio: FindOneOptions = { where: { idClase: id} };
            let clase: Clase = await this.claseRepository.findOne(criterio);
            if (!clase)
                throw new Error('No se encuentra la clase');
            else {
                clase.setNombre(claseDTO.nombre);
                clase.setIdEscuela(claseDTO.idEscuela);
                clase.setIdProfesor(claseDTO.idProfesor);
                clase = await this.claseRepository.save(clase);
                return clase;
            }

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en la actualizacion de clase ' + error
            }, HttpStatus.NOT_FOUND);
        }
    }

    public async deleteClase(id: number): Promise<boolean> {
        try {
            let criterio: FindOneOptions = { where: { idClase: id } };
            let clase: Clase = await this.claseRepository.findOne(criterio);
            if (!clase) {
                throw new Error('No se encuentra la clase');
            }

            else {
                await this.claseRepository.delete(clase.getId());
                return true;
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en la eliminacion de la clase' + error
            }, HttpStatus.NOT_FOUND);
        }
    }
}
