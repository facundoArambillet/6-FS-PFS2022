import { Escuela } from "src/escuela/escuela.entity";
import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany } from "typeorm";

@Entity("ciudades")
export class Ciudad {
    @PrimaryGeneratedColumn()
    private idCiudad: number;

    @Column()
    private nombre: string;

    @OneToMany(type => Escuela,
        escuela => escuela.ciudad)
    @JoinColumn()
    public escuelas: Escuela[]

    constructor(nombre: string) {
        this.nombre = nombre;
    }

    public getIdCiudad(): number {
        return this.idCiudad;
    }
    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nuevoNombre: string): void {
        this.nombre = nuevoNombre;
    }
}