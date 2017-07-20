import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { EstadoDocumento } from '../../models/estadoDocumento';

@Injectable()
export class ListaDocumentoProvider {

  constructor(public http: Http) {
    
  }

  getDocumentoStates():Array<EstadoDocumento>{
    return[EstadoDocumento.NOVA, EstadoDocumento.EXECUTANDO, EstadoDocumento.FINALIZADA];
  }

}
