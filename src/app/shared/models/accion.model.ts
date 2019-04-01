export class Accion {
    idAccion: string;
    nombre: string;
    descripcion: string;
    estatus: boolean;

    constructor(idAccion: string, nombre: string) {
        this.idAccion = idAccion;
        this.nombre = nombre;
    }
}