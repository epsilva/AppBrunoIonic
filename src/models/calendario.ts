import { Usuario } from "./usuario";

export class Calendario {

    id:string;
    titulo:string;
    dataInicio:Date;
    horaInicio:Date;
    dataFim:Date;
    horaFim:Date;
    usuarioParticipante:Array<Usuario>;
    usuarioPai:Usuario;

}