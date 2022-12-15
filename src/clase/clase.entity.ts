import { Escuela } from "src/escuela/escuela.entity";
import { Estudiante } from "src/estudiante/estudiante.entity";
import { Profesor } from "src/profesor/profesor.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("clases")
export default class Clase {
    @PrimaryGeneratedColumn()
    private idClase: number;

    @Column()
    private nombre: string;
    @Column()
    private escuelaIdEscuela: number;
    @Column()
    private profesorIdProfesor: number;

    @ManyToOne(type => Escuela,
        escuela => escuela.clases)
    @JoinColumn()
    public escuela: Escuela;

    @ManyToOne(type => Profesor,
        profesor => profesor.clases)
    @JoinColumn()
    public profesor: Profesor;

    @ManyToMany(type => Estudiante, estudiante => estudiante.clases)
    @JoinTable()
    public estudiantes: Estudiante[];

    public constructor(nombre: string, idEscuela: number, idProfesor: number) {
        this.nombre = nombre;
        this.escuelaIdEscuela = idEscuela;
        this.profesorIdProfesor = idProfesor;
    }

    public getId(): number {
        return this.idClase;
    }
    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nuevoNombre: string): void {
        this.nombre = nuevoNombre;
    }
    public setIdEscuela(nuevaEscuela: number): void {
        this.escuelaIdEscuela = nuevaEscuela;
    }
    public setIdProfesor(nuevoProfesor: number): void {
        this.profesorIdProfesor = nuevoProfesor;
    }
}