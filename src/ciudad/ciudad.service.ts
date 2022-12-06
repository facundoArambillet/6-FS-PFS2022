import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {FindOneOptions, Repository} from "typeorm";
import { Ciudad } from './ciudad.entity';

@Injectable()
export class CiudadService {
    private ciudades : Ciudad[] = [];
    constructor (@InjectRepository(Ciudad)
    private readonly ciudadRepository : Repository<Ciudad>) {}

    public async getAll (): Promise<Ciudad[]> {
        let ciudades : Ciudad[] = await this.ciudadRepository.find();
        return ciudades;
    }

    
    public async getById (id: number): Promise<Ciudad> {
        try {
            const criterio : FindOneOptions = {where :{idCiudad : id}}
            let ciudad : Ciudad = await this.ciudadRepository.findOne(criterio);
            if(ciudad) {
                return ciudad;
            }
            else {
                throw new Error("La ciudad no se encuentra") // No me reconoce el Exception
            }
        } catch (error) {
            throw new HttpException({status: HttpStatus.NOT_FOUND, error: `Error en la busqueda de ciudad ${id}: ${error}`},
            HttpStatus.NOT_FOUND)
        }

    }
   
}
