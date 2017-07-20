import { Usuario } from "./usuario";
import { EstadoDocumento } from "./estadoDocumento";

export class Documento {

    id:string;
    titulo:string;
    link:string;
    usuario:Usuario;
    data:Date;
    state:EstadoDocumento;

    constructor(titulo?:string, link?:string){
        this.titulo = titulo;
        this.link = link;
        this.state = EstadoDocumento.NOVA;
    }

}