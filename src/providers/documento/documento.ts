import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoginProvider } from '../login/login';
import firebase from 'firebase';
import { Documento } from "../../models/documento";
import { Usuario } from "../../models/usuario";

@Injectable()
export class DocumentoProvider {

  reference
  private usuario: Usuario;

  constructor(public http: Http, public loginProvider: LoginProvider) {
    console.log('Hello DocumentoProvider Provider');
    this.initialize();
  }

  ionViewDidLoad(){

  }

  private initialize() {
    this.reference = firebase.database().ref('/documentos/');
  }

  save(documento: Documento) {
    firebase.database().ref('/usuario/' + this.loginProvider.currentUser.uid).once("value", (snapshot) => {
      this.usuario = snapshot.val();
      let refKey;
      // update
      if (documento.id != undefined) {
        refKey = documento.id;
      } else {
        // insert
        refKey = this.reference.push().key;
        documento.id = refKey;
      }
      documento.data = new Date();
      documento.usuario = this.usuario;
      this.reference.child(refKey).update(documento);
      });
    
  }

  deletar(documento: Documento): any {
    return this.reference.child(documento.id).remove();
  }



}
