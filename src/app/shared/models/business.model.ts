import { Service } from "./service.model";
import { PaymentMethod } from "./payment-method.model";
import { CardType } from "./card-type.model";
import { HorarioNegocio } from "./horario.model";

export class Business {
    idNegocio: string;
    nombre: string;
    idCategoria: number;
    email: string;
    descripcion: string;
    telefono: string;
    latitud: number;
    longitud: number;
    idCuenta: string;
    codigoPostal: string;
    delegacion: string;
    colonia: string;
    calle: string;
    numeroExterior: string;
    idEstatus: number;
    responsable: string;
    servicios: Array<Service>;
    metodoPago: Array<PaymentMethod>;
    tipoTarjeta: Array<CardType>;
    acciones: Array<number>;
    horario: Array<HorarioNegocio>;
}