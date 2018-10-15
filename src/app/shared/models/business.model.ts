import { Service } from "./service.model";
import { PaymentMethod } from "./payment-method.model";
import { CardType } from "./card-type.model";

export class Business{
    idNegocio:string;
    nombre:string;
    idCategoria:number;
    email:string;
    descripcion:string;
    telefono:string;
    domicilio:string;
    latitud:number;
    longitud:number;
    idCuenta:string;
    codigoPostal:string;
    delegacion:string;
    colonia:string;
    calle:string;
    numeroExterior:string;
    estatus:boolean;
    horario:string;
    responsable:string;
    serviciosList:Array<Service>;
    metodoPagoList:Array<PaymentMethod>;
    tipoTarjetaList:Array<CardType>;
}