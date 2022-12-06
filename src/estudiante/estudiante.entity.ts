import {Entity,PrimaryColumn, Column} from "typeorm";

@Entity("estudiantes")
export class Estudiante {
    @PrimaryColumn()
    private idEstudiante : number;

    @Column()
    private apellidoNombres : string;

    @Column()
    private fechaNacimiento : Date;

    constructor(id : number, nombre : string, fechaNacimiento : Date) {
        this.idEstudiante = id;
        this.apellidoNombres = nombre;
        this.fechaNacimiento = fechaNacimiento;
    }

    public getIdEstudiante () : number {
        return this.idEstudiante;
    }
    public getNombre () : string {
        return this.apellidoNombres;
    }
    public getFechaNacimiento () : Date {
        return this.fechaNacimiento;
    }

    public setIdEstudiante (nuevoId : number) : void {
        this.idEstudiante = nuevoId;
    }

    public setNombre (nuevoNombre : string) : void {
        this.apellidoNombres = nuevoNombre;
    }

    public setFechaNacimiento (nuevaFecha : Date) : void {
        this.fechaNacimiento = nuevaFecha;
    }
}