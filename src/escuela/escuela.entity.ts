import { Ciudad } from "src/ciudad/ciudad.entity";
import Clase from "src/clase/clase.entity";
import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("escuelas")
export class Escuela {
    @PrimaryGeneratedColumn()
    private idEscuela: number;

    @Column()
    private nombre: string;

    @Column()
    private domicilio: string;

    @Column()
    private ciudadIdCiudad: number;

    @ManyToOne(type => Ciudad,
        ciudad => ciudad.escuelas)
    @JoinColumn()
    public ciudad: Ciudad;

    @OneToMany(type => Clase,
        clase => clase.escuela)
    @JoinColumn()
    public clases: Clase[];


    constructor(nombre: string, domicilio: string, ciudad: number) {
        this.nombre = nombre;
        this.domicilio = domicilio;
        this.ciudadIdCiudad = ciudad;
    }

    public getIdEscuela(): number {
        return this.idEscuela
    }
    public getNombre(): string {
        return this.nombre;
    }
    public getDomicilio(): string {
        return this.domicilio;
    }
/*
    public getIdCiudad(): number {
        return this.idCiudad;
    }
*/
    public setNombre(nuevoNombre: string): void {
        this.nombre = nuevoNombre;
    }
    public setDomicilio(nuevoDomicilio: string): void {
        this.domicilio = nuevoDomicilio;
    }
    public setIdCiudad(nuevaCiudad : number ): void {
        this.ciudadIdCiudad = nuevaCiudad;
    }
}