import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsSelect, Repository } from "typeorm";
import { CiudadDTO } from './ciudad.dto';
import { Ciudad } from './ciudad.entity';

@Injectable()
export class CiudadService {
    private ciudades: Ciudad[] = [];
    constructor(@InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>) { }

    public async getAll(): Promise<Ciudad[]> {
        this.ciudades = await this.ciudadRepository.find();
        return this.ciudades;
    }


    public async getById(id: number): Promise<Ciudad> {
        try {
            const criterio: FindOneOptions = { where: { idCiudad: id } }
            let ciudad: Ciudad = await this.ciudadRepository.findOne(criterio);
            if (ciudad) {
                return ciudad;
            }
            else {
                throw new Error("La ciudad no se encuentra") // No me reconoce el Exception
            }
        } catch (error) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: `Error en la busqueda de ciudad ${id}: ${error}` },
                HttpStatus.NOT_FOUND)
        }

    }

    public async addCiudad(ciudadDTO: CiudadDTO): Promise<Ciudad> {
        try {
            let ciudad: Ciudad = await this.ciudadRepository.save(new Ciudad(
                ciudadDTO.idCiudad, ciudadDTO.nombre
            ));
            if (ciudad)
                return ciudad;
            else
                throw new Error('No se pudo crear la ciudad');
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en la creacion de ciudad ' + error
            }, HttpStatus.NOT_FOUND);
        }
    }

    public async updateCiudad(ciudadDTO: CiudadDTO): Promise<Ciudad> {
        try {
            let criterio: FindOneOptions = { where: { idCiudad: ciudadDTO.idCiudad } };
            let ciudad: Ciudad = await this.ciudadRepository.findOne(criterio);
            if (!ciudad)
                throw new Error('No se encuentra la ciudad');
            else {
                ciudad.setIdCiudad(ciudadDTO.idCiudad);
                ciudad.setNombre(ciudadDTO.nombre);
                ciudad = await this.ciudadRepository.save(ciudad);
                return ciudad;
            }

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en la actualizacion de ciudad ' + error
            }, HttpStatus.NOT_FOUND);
        }
    }

    public async deleteCiudad(ciudadDTO: CiudadDTO): Promise<boolean> {
        try {
            let criterio: FindOneOptions = { where: { idCiudad: ciudadDTO.idCiudad } };
            let ciudad: Ciudad = await this.ciudadRepository.findOne(criterio);
            if (!ciudad) {
                throw new Error('No se encuentra la ciudad');
            }

            else {
                await this.ciudadRepository.delete(ciudad.getIdCiudad());
                return true;
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en la eliminacion de ciudad ' + error
            }, HttpStatus.NOT_FOUND);
        }
    }
}
