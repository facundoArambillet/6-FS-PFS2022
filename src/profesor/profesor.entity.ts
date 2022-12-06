import {Entity,PrimaryColumn, Column} from "typeorm";

@Entity("profesores")
export class Profesor {
    @PrimaryColumn()
    private idProfesor : number;

    @Column()
    private apellidoNombres : string;

    constructor(id : number, nombre : string) {
        this.idProfesor = id;
        this.apellidoNombres = nombre;
    }

    public getIdProfesor () : number {
        return this.idProfesor;
    }
    public getNombre () : string {
        return this.apellidoNombres;
    }

    public setIdProfesor (nuevoId : number) : void {
        this.idProfesor = nuevoId;
    }

    public setNombre (nuevoNombre : string) : void {
        this.apellidoNombres = nuevoNombre;
    }
}