export class Dia {
    idDia: number;
    abierto: boolean;
    dia: string;
    veintiCuatroHrs: boolean;
    horario: Array<Horario>;
    constructor(idDia: number, dia: string, horario: Array<Horario>) {
        this.idDia = idDia;
        this.abierto = false;
        this.veintiCuatroHrs = false;
        this.dia = dia;
        this.horario = horario;
    }
}
export class Horario {
    abre: string;
    cierra: string;

    constructor(abre: string, cierra: string) {
        this.abre = abre;
        this.cierra = cierra;
    }
}

export class HorarioNegocio {
    idNegocio: string;
    idDia: number;
    abre: string;
    cierra: string;
    abierto: boolean;
    veinticuatroHrs: boolean;
}