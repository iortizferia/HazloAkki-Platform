export class Offer {
    id: string;
    titulo: string;
    mensaje: string;
    imagenes: string;
    fecha: string;
    duracion: string;
    idNegocio: string;
    estatus: boolean;

    constructor(idNegocio: string) {
        this.idNegocio = idNegocio;
    }
}