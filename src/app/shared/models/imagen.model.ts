export class Imagen {
    idImagen: string;
    idNegocio: string;
    rutaImagen: any;
    perfil: boolean;
    idexFile: number;

    constructor(rutaImagen: any) {
        this.rutaImagen = rutaImagen;
        this.idImagen = null;
        this.idNegocio = null;
    }
}