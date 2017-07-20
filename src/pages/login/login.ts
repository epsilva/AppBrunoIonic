import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { RegistrarPage } from '../registrar/registrar';
import { LoginProvider } from '../../providers/login/login';
import { Credential } from '../../models/credential';
import { DocumentoListaPage } from '../documento-lista/documento-lista';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credential:Credential;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loginProvider: LoginProvider, public menuCtrl: MenuController) {
    this.credential = new Credential();
  }

  ionViewDidEnter(){
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeEnable(false);
  }

  ionViewDidLoad() {
    this.loginProvider.loginSucessoEventEmitter.subscribe(
      user => {
        this.menuCtrl.enable(true);
        this.menuCtrl.swipeEnable(true);
        this.navCtrl.setRoot(DocumentoListaPage)
      }
    );
    this.loginProvider.loginFalhaEventEmitter.subscribe(
        error => console.log(error)
    );
  }

  logarComEmail(){
    this.loginProvider.loginWithCredential(this.credential);
  }

  logarComGoogle(){
    this.loginProvider.loginWithGoogle();
  }

  logarFacebook(){
    this.loginProvider.loginWithFacebook();
  }

  registrar(){
    this.sair();
    // this.navCtrl.push(RegistrarPage);
  }

  sair(){
    this.loginProvider.exit();
  }

}
