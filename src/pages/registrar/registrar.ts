import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { Credential } from '../../models/credential'

/**
 * Generated class for the RegistrarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {

  credential:Credential;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loginProvider:LoginProvider) {
    this.credential = new Credential();
  }

  registrar(){
    this.loginProvider.registrar(this.credential);
  }

}
