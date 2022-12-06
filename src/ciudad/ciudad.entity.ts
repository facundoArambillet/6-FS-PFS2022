import {Entity,PrimaryColumn, Column} from "typeorm";

@Entity("ciudades")
export class Ciudad {
    @PrimaryColumn()
    private idCiudad : number;

    @Column()
    private nombre : string;

    constructor(id : number, nombre : string) {
        this.idCiudad = id;
        this.nombre = nombre;
    }

    public getIdCiudad () : number {
        return this.idCiudad;
    }
    public getNombre () : string {
        return this.nombre;
    }

    public setIdCiudad (nuevoId : number) : void {
        this.idCiudad = nuevoId;
    }

    public setNombre (nuevoNombre : string) : void {
        this.nombre = nuevoNombre;
    }
}