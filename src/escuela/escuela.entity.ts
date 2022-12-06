import {Entity,PrimaryColumn, Column} from "typeorm";

@Entity("escuelas")
export class Escuela {
    @PrimaryColumn()
    private idEscuela : number;

    @Column()
    private nombre : string;

    @Column()
    private domicilio : string;

    @Column()
    private idCiudad : number;

    constructor(idEscuela : number, nombre : string, domicilio : string, idCiudad : number) {
        this.idEscuela = idEscuela;
        this.nombre = nombre;
        this.domicilio = domicilio;
        this.idCiudad = idCiudad;
    }

    public getIdEscuela () : number {
        return this.idEscuela
    }
    public getNombre () : string {
        return this.nombre;
    }
    public getDomicilio () : string {
        return this.domicilio;
    }
    public getIdCiudad() : number {
        return this.idCiudad;
    }


    public setIdEscuela (nuevoId : number) : void {
        this.idEscuela = nuevoId;
    }
    public setNombre (nuevoNombre : string) : void {
        this.nombre = nuevoNombre;
    }
    public setDomicilio (nuevoDomicilio : string) : void {
        this.domicilio = nuevoDomicilio;
    }
    public setIdCiudad (nuevoIdCiudad : number) : void {
        this.idCiudad = nuevoIdCiudad;
    }
}