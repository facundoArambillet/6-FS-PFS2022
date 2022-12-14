import {Entity,PrimaryColumn, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity("estudiantes")
export class Estudiante {
    @PrimaryGeneratedColumn()
    private idEstudiante : number;

    @Column()
    private apellidoNombres : string;

    @Column()
    private fechaNacimiento : string;

    constructor(nombre : string, fechaNacimiento : string) {
        this.apellidoNombres = nombre;
        this.fechaNacimiento = fechaNacimiento;
        
    }

    public getIdEstudiante () : number {
        return this.idEstudiante;
    }
    public getNombre () : string {
        return this.apellidoNombres;
    }
    public getFechaNacimiento () : string {
        return this.fechaNacimiento;
    }


    public setNombre (nuevoNombre : string) : void {
        this.apellidoNombres = nuevoNombre;
    }

    public setFechaNacimiento (nuevaFecha : string) : void {
        this.fechaNacimiento = nuevaFecha;
    }

    /*
    private calcularFecha() {
        let fechaNacimiento = this.fechaNacimiento;
        let fechas = fechaNacimiento.split("-")
        this.fechaNacimiento = new Date(fechas[0],fechas[1],fechas[2])
    }
    */
}