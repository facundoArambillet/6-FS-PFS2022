import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {FindManyOptions, FindOneOptions, Repository} from "typeorm";
import { EscuelaDTO } from './escuela.dto';
import { Escuela } from './escuela.entity';

@Injectable()
export class EscuelaService {
    private escuelas : Escuela[] = [];
    constructor (@InjectRepository(Escuela)
    private readonly escuelaRepository : Repository<Escuela>) {}

    public async getAll (): Promise<Escuela[]> {
        let criterio : FindManyOptions = { relations: [ 'ciudad' ], order: {
            idEscuela : "ASC"
        } };
        this.escuelas = await this.escuelaRepository.find(criterio);
        return this.escuelas;
    }

    public async getAllOnlyEscuelas(orden: string): Promise<Escuela[]> {
        let criterio : FindManyOptions = { order: {
            nombre : orden
        } };
        this.escuelas = await this.escuelaRepository.find(criterio);
        return this.escuelas
    }

    public async getById (id: number): Promise<Escuela> {
        try {
            const criterio : FindOneOptions = {where :{idEscuela : id},  relations: [ 'ciudad' ]} 
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
                 escuelaDTO.nombre, escuelaDTO.domicilio, escuelaDTO.idCiudad
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

    public async updateEscuela(id : number,escuelaDTO: EscuelaDTO): Promise<Escuela> {
        try {
            if(!id || !escuelaDTO) {
                throw new Error("datos invalidos");
                
            }
            else {  
                try {
                    let criterio: FindOneOptions = { where: { idEscuela: id }/*,  relations: [ 'ciudad' ] */};
                    let escuela: Escuela = await this.escuelaRepository.findOne(criterio);
                    if (!escuela)
                        throw new Error('No se encuentra la escuela');
                    else {
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

        } catch (error) {
            return error.message;
        }

    }

    public async deleteEscuela(id: number): Promise<boolean> {
        try {
            if(!id) {
                throw new Error("ID invalido");
            }
            else {
                try {
                    let criterio: FindOneOptions = { where: {  idEscuela: id}/*,  relations: [ 'ciudad' ]*/ };
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
        catch(error) {
            return error.message;
        }


    }
}