import {Entity,PrimaryColumn, Column} from "typeorm";

@Entity("estudiantes")
export class Estudiante {
    @PrimaryColumn()
    private idEstudiante : number;

    @Column()
    private apellidoNombres : string;

    @Column()
    private fechaNacimiento : string;

    constructor(id : number, nombre : string, fechaNacimiento : string) {
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
    public getFechaNacimiento () : string {
        return this.fechaNacimiento;
    }

    public setIdEstudiante (nuevoId : number) : void {
        this.idEstudiante = nuevoId;
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