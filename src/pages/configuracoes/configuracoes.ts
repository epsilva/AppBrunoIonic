import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { LoginProvider } from "../../providers/login/login";
import { LoginPage } from "../login/login";

/**
 * Generated class for the ConfiguracoesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html',
})
export class ConfiguracoesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public loginProvider: LoginProvider, public viewController: ViewController, public platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfiguracoesPage');
  }

  sair() {
    this.loginProvider.exit();
  }

}
