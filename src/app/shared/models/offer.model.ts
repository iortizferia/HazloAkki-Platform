import { OfferConfiguration } from "./offer.config.model";

export class Offer {
    idOferta: string;
    idNegocio: string;
    titulo: string;
    descripcion: string;
    fechaAlta: string;
    fechaModificacion: string;
    configuracion: OfferConfiguration;
    acciones: Array<number>;

    constructor(idNegocio: string) {
        this.idNegocio = idNegocio;
    }
}