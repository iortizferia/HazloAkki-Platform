export class Imagen {
    idImagen: string;
    idNegocio: string;
    rutaImagen: any;
    perfil: boolean;

    constructor(rutaImagen: any) {
        this.rutaImagen = rutaImagen;
    }
}