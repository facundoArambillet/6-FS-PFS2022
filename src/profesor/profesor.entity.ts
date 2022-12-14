import Clase from "src/clase/clase.entity";
import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("profesores")
export class Profesor {
    @PrimaryGeneratedColumn()
    private idProfesor: number;

    @Column()
    private apellidoNombres: string;

    @OneToMany(type => Clase,
        clases => clases.profesor)
    @JoinColumn()
    public clases: Clase[];

    constructor(nombre: string) {
        this.apellidoNombres = nombre;
    }

    public getIdProfesor(): number {
        return this.idProfesor;
    }
    public getNombre(): string {
        return this.apellidoNombres;
    }

    public setNombre(nuevoNombre: string): void {
        this.apellidoNombres = nuevoNombre;
    }
}