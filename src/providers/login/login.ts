import { Injectable, EventEmitter, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Credential } from '../../models/credential';
import firebase from 'firebase';

@Injectable()
export class LoginProvider {

  currentUser:any;
  isAutenticado:boolean;
  loginSucessoEventEmitter:EventEmitter<any>;
  loginFalhaEventEmitter:EventEmitter<any>;
  logoutEventEmiiter:EventEmitter<any>;

  constructor(public http: Http, public ngZone: NgZone) {
    this.loginSucessoEventEmitter = new EventEmitter();
    this.loginFalhaEventEmitter = new EventEmitter();
    this.logoutEventEmiiter = new EventEmitter();
    firebase.auth().onAuthStateChanged(usuario => {
        this.callBackStateChange(usuario);
    });
  }

  private callBackStateChange(usuario){
    this.ngZone.run(() => {
      if(usuario == null){
          this.currentUser = null;
          this.isAutenticado = false;
      }else{
          this.currentUser = usuario;
          this.isAutenticado = true;
      }
    });
  }

  loginWithCredential(credential:Credential){
      firebase.auth().signInWithEmailAndPassword(credential.email, credential.senha)
      .then(
        result => this.callBackSucessLogin(result)
      )
      .catch(
        error => this.callBackFailLogin(error)
      );
  }

  loginWithGoogle(){
    let provider = new firebase.auth.GoogleAuthProvider;
    firebase.auth().signInWithPopup(provider)
      .then(
        result => this.callBackSucessLogin(result)
      )
      .catch(
        error => this.callBackFailLogin(error)
      );
  }

  exit(){
    firebase.auth().signOut().then(
      () => this.logoutEventEmiiter.emit(true)
    )
    .catch(
      error => this.logoutEventEmiiter.emit(error)
    );
  }

  registrar(credential:Credential){
    firebase.auth().createUserWithEmailAndPassword(credential.email, credential.senha)
    .then(result => console.log(result))
    .catch(error => console.log(error));
  }

  private callBackSucessLogin(response){
      this.loginSucessoEventEmitter.emit(response.user);
  }

  private callBackFailLogin(erro){
      this.loginFalhaEventEmitter.emit({code: erro.code, message: erro.message, email: erro.email, credential: erro.credential });
  }

}
