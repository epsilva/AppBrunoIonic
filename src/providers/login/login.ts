import { Injectable, EventEmitter, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Credential } from '../../models/credential';
import firebase from 'firebase';
import { AlertController } from "ionic-angular";
import { Usuario } from "../../models/usuario";

@Injectable()
export class LoginProvider {

  currentUser: any;
  isAutenticado: boolean;
  loginSucessoEventEmitter: EventEmitter<any>;
  loginFalhaEventEmitter: EventEmitter<any>;
  logoutEventEmiiter: EventEmitter<any>;

  constructor(public http: Http, public ngZone: NgZone, public alertCtrl: AlertController) {
    this.loginSucessoEventEmitter = new EventEmitter();
    this.loginFalhaEventEmitter = new EventEmitter();
    this.logoutEventEmiiter = new EventEmitter();
    firebase.auth().onAuthStateChanged(usuario => {
      this.callBackStateChange(usuario);
    });
  }

  private callBackStateChange(usuario) {
    this.ngZone.run(() => {
      if (usuario == null) {
        this.currentUser = null;
        this.isAutenticado = false;
      } else {
        this.currentUser = usuario;
        this.isAutenticado = true;
      }
    });
  }

  loginWithCredential(credential: Credential) {

    if (!(credential.email == undefined && credential.senha == undefined)) {
      firebase.auth().signInWithEmailAndPassword(credential.email, credential.senha)
        .then(
        result => this.callBackSucessLogin(result)
        )
        .catch(
        error => this.callBackFailLogin(error)
        );
    } else {
      this.alerta("Dados Obigatórios", "Preencha todos os campos");
    }

  }

  loginWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider;
    firebase.auth().signInWithPopup(provider)
      .then(
      result => this.callBackSucessLogin(result)
      )
      .catch(
      error => this.callBackFailLogin(error)
      );
  }

  loginWithFacebook() {
    let provider = new firebase.auth.FacebookAuthProvider;
    firebase.auth().signInWithPopup(provider)
      .then(
      result => this.callBackSucessLogin(result)
      )
      .catch(
      error => this.callBackFailLogin(error)
      );
  }

  exit() {
    firebase.auth().signOut().then(
      () => this.logoutEventEmiiter.emit(true)
    )
      .catch(
      error => this.logoutEventEmiiter.emit(error)
      );
  }

  registrar(credential: Credential) {
    let usuario: Usuario = new Usuario();
    firebase.auth().createUserWithEmailAndPassword(credential.email, credential.senha)
      .then(
      result => {
        console.log(result);
        usuario.nome = credential.nome;
        usuario.email = credential.email;
        usuario.id = result.uid;
        firebase.database().ref('usuario/').child(result.uid).set(usuario)
      }
      )
      .catch(error => {
        console.log(error),
          this.alertaEmail(error)
      }

      );
  }

  registrarUserInfo(user) {
    let usuario: Usuario = new Usuario();
    usuario.nome = user.displayName;
    usuario.email = user.email;
    usuario.id = user.uid;
    firebase.database().ref('usuario/').child(usuario.id).set(usuario);
  }

  private callBackSucessLogin(response) {
    this.loginSucessoEventEmitter.emit(response.user);
    this.loginSucessoEventEmitter.subscribe(
      user => this.registrarUserInfo(user)
    );
  }

  private callBackFailLogin(erro) {
    this.loginFalhaEventEmitter.emit({ code: erro.code, message: erro.message, email: erro.email, credential: erro.credential });
    this.alertaEmail(erro);
  }

  private alertaEmail(erro) {
    if (erro.code == 'auth/invalid-email') {
      this.alerta("Formato do E-mail Inválido", "O e-mail informado não é válido. Exemplo: exemplo@exemplo.com");
    }
    if (erro.code == 'auth/user-not-found') {
      this.alerta("E-mail não cadastrado", "Registre-se antes de inicar no App.");
    }
    if (erro.code == 'auth/wrong-password') {
      this.alerta("Dados incorretos", "E-mail e/ou senha incorretos.");
    }
    if (erro.code == 'auth/weak-password') {
      this.alerta("Senha Fraca", "Senha deve conter no mínimo 6 caracteres.");
    }
    if (erro.code == 'auth/email-already-in-use') {
      this.alerta("E-mail em uso", "Este e-mail já está sendo usado.");
    }
  }


  private alerta(titulo: string, mensagem: string) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensagem,
      buttons: ['OK']
    });
    alert.present();
  }

}

