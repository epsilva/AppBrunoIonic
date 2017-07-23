import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BancoHorasFormPage } from "../banco-horas-form/banco-horas-form";
import * as moment from 'moment';
import { BancoHorasProvider } from "../../providers/banco-horas/banco-horas";
import { BancoHoras } from "../../models/bancoHoras";

@Component({
  selector: 'page-banco-horas-lista',
  templateUrl: 'banco-horas-lista.html',
})
export class BancoHorasListaPage {

  bancoHoras: BancoHoras;
  data: string;
  loop;
  listaHoras: Array<BancoHoras> = new Array();


  constructor(public navCtrl: NavController, public navParams: NavParams, public bancoHorasProvider:BancoHorasProvider, public ngZone: NgZone) {
    this.listaHoras = new Array();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BancoHorasListaPage');
    this.recuperarHoras()
  }

  adicionarHoras() {
    this.navCtrl.push(BancoHorasFormPage);
  }

  recuperarHoras(){
    var listaHoras: Array<BancoHoras> = new Array();
    this.bancoHorasProvider.getReference().on('value', (snapshot) => {
      this.ngZone.run(() => {
        this.listaHoras = new Array();
        listaHoras = new Array();
        let innerArray = new Array();
        snapshot.forEach(element => {
          let el = element.val();
          innerArray.push(el);
          listaHoras = innerArray;
        });
      });
      if (listaHoras.length > 0) {
        listaHoras.forEach(elemento => {
          if(elemento.dataSaida != undefined){
            var now = moment(elemento.dataEntrada);
            var end = moment(elemento.dataSaida);
           
            var diffHoras = moment.utc(moment(end,"DD/MM/YYYY HH:mm").diff(moment(now,"DD/MM/YYYY HH:mm"))).format("HH:mm");
            elemento.horasTrabalhadas = diffHoras;

            this.listaHoras.push(elemento);
          }
        });
    }
    });
  }

}
