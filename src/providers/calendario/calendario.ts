import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoginProvider } from "../login/login";
import { Usuario } from "../../models/usuario";
import firebase from 'firebase';
import { Calendario } from "../../models/calendario";

@Injectable()
export class CalendarioProvider {

  reference;
  refUsuario;
  private usuario: Usuario;

  constructor(public http: Http, public loginProvider: LoginProvider) {
    console.log('Hello CalendarioProvider Provider');
  }

  ionViewDidLoad(){

  }

  private initialize() {
    this.reference = firebase.database().ref('/calendario/');
  }

  salvarEvento(calendario:Calendario){
    firebase.database().ref('/usuario/'+this.loginProvider.currentUser.uid).once("value", (snapshot) => {
        this.usuario = snapshot.val();
        calendario.usuarioPai = this.usuario;
        var key = this.getReference().push().key;
        calendario.usuarioParticipante.forEach((usuarioParticipante) => {
          calendario.id = key;
          this.getReference().child(key).child(usuarioParticipante.id).set(calendario);
        });
    });
  }

  getReference(){
    this.reference = firebase.database().ref('/calendario/');
    return this.reference;
  }

  getUsuarios(){
    this.refUsuario = firebase.database().ref('/usuario/');
    return this.refUsuario;
  }

}
