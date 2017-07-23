import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BancoHorasFormPage } from "../banco-horas-form/banco-horas-form";

@Component({
  selector: 'page-banco-horas-lista',
  templateUrl: 'banco-horas-lista.html',
})
export class BancoHorasListaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BancoHorasListaPage');
  }

  adicionarHoras() {
    this.navCtrl.push(BancoHorasFormPage);
  }

}
