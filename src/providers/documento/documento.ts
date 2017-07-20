import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoginProvider } from '../login/login';
import firebase from 'firebase';
import { Documento } from "../../models/documento";

@Injectable()
export class DocumentoProvider {

  reference

  constructor(public http: Http, public loginProvider: LoginProvider) {
    console.log('Hello DocumentoProvider Provider');
    this.initialize();
  }

  getAll():Array<Documento>{
    return new Array();
  }

  private initialize(){
    this.reference = firebase.database().ref('/documentos/');
  }

  save(documento:Documento){
    let refKey;
    // update
    if(documento.id != undefined){
      refKey = documento.id;
    } else {
      // insert
      refKey = this.reference.push().key;
      documento.id = refKey;
    }
    this.reference.child(refKey).update(documento);
  }

  deletar(documento:Documento):any{
    return this.reference.child(documento.id).remove();
  }

  

}
