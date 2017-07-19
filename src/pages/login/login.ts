import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RegistrarPage } from '../registrar/registrar';
import { LoginProvider } from '../../providers/login/login';
import { Credential } from '../../models/credential';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credential:Credential;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loginProvider: LoginProvider) {
    this.credential = new Credential();
  }

  ionViewDidLoad() {
    this.loginProvider.loginSucessoEventEmitter.subscribe(
        user => console.log(user)
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

  registrar(){
    this.navCtrl.push(RegistrarPage);
  }

  sair(){
    this.loginProvider
  }

}
