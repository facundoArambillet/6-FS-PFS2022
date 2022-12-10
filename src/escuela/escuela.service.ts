import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {FindOneOptions, Repository} from "typeorm";
import { EscuelaDTO } from './escuela.dto';
import { Escuela } from './escuela.entity';

@Injectable()
export class EscuelaService {
    private escuelas : Escuela[] = [];
    constructor (@InjectRepository(Escuela)
    private readonly escuelaRepository : Repository<Escuela>) {}

    public async getAll (): Promise<Escuela[]> {
        this.escuelas = await this.escuelaRepository.find();
        return this.escuelas;
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
   
    public async addEscuela(escuelaDTO: EscuelaDTO): Promise<Escuela> {
        try {
            let escuela: Escuela = await this.escuelaRepository.save(new Escuela(
                escuelaDTO.idEscuela, escuelaDTO.nombre, escuelaDTO.domicilio, escuelaDTO.idCiudad
            ));
            if (escuela)
                return escuela;
            else
                throw new Error('No se pudo crear la escuela');
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en la creacion de escuela ' + error
            }, HttpStatus.NOT_FOUND);
        }
    }

    public async updateEscuela(escuelaDTO: EscuelaDTO): Promise<Escuela> {
        try {
            let criterio: FindOneOptions = { where: { idEscuela: escuelaDTO.idEscuela } };
            let escuela: Escuela = await this.escuelaRepository.findOne(criterio);
            if (!escuela)
                throw new Error('No se encuentra la escuela');
            else {
                escuela.setIdEscuela(escuelaDTO.idEscuela);
                escuela.setNombre(escuelaDTO.nombre);
                escuela.setDomicilio(escuelaDTO.domicilio);
                escuela.setIdCiudad(escuelaDTO.idCiudad);
                escuela = await this.escuelaRepository.save(escuela);
                return escuela;
            }

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en la actualizacion de escuela ' + error
            }, HttpStatus.NOT_FOUND);
        }
    }

    public async deleteEscuela(escuelaDTO: EscuelaDTO): Promise<boolean> {
        try {
            let criterio: FindOneOptions = { where: {  idEscuela: escuelaDTO.idEscuela} };
            let escuela: Escuela = await this.escuelaRepository.findOne(criterio);
            if (!escuela) {
                throw new Error('No se encuentra la escuela');
            }

            else {
                await this.escuelaRepository.delete(escuela.getIdEscuela());
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