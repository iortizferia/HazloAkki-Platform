export class Accion {
    idAccion: number;
    nombre: string;
    descripcion: string;
    estatus: boolean;

    constructor(idAccion: number, nombre: string) {
        this.idAccion = idAccion;
        this.nombre = nombre;
    }
}