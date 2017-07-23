import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BancoHorasProvider } from "../../providers/banco-horas/banco-horas";
import { BancoHoras } from "../../models/bancoHoras";
import * as moment from 'moment';
import { LoginProvider } from "../../providers/login/login";

/**
 * Generated class for the BancoHorasFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-banco-horas-form',
  templateUrl: 'banco-horas-form.html',
})
export class BancoHorasFormPage {

  bancoHoras: BancoHoras;
  data: string;
  loop;
  dataAtual:string;
  horaEntrada:string;
  horaSaida:string;
  listaHoras: Array<BancoHoras> = new Array();
  somaHoras:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public bancoHorasProvider: BancoHorasProvider ,public ngZone: NgZone, public loginProvider: LoginProvider) {
    this.bancoHoras = new BancoHoras();
    this.dataAtual = new Date().toISOString();
    this.recuperarHoras();
  }

  ionViewDidEnter() {
    this.horaCurrent();
  }

  ionViewDidLoad() {
    this.recuperarHoras();
  }

  ionViewDidLeave() {
    clearInterval(this.loop);
  }

  salvarBancoHoras() {
    this.bancoHorasProvider.save(this.data);    
  }


  horaCurrent() {
    this.loop = setInterval(() => {
      this.data = new Date().toISOString();
    }, 1000);
  }

  recuperarHoras(){
    this.bancoHorasProvider.getReference().on('value', (snapshot) => {
      this.ngZone.run(() => {
        let innerArray = new Array();
        snapshot.forEach(element => {
          let el = element.val();
          innerArray.push(el);
          this.listaHoras = innerArray;
        });
      });
      if (this.listaHoras.length > 0) {
        this.listaHoras.forEach(elemento => {
          this.horaEntrada = "";
          this.horaSaida = "";
          this.somaHoras = "";
          if(elemento.dataEntrada != undefined){
            this.horaEntrada = elemento.dataEntrada.toString();
          }
          if(elemento.dataSaida != undefined){
            this.horaSaida = elemento.dataSaida.toString();
            
            var now = moment(elemento.dataEntrada);
            var end = moment(elemento.dataSaida);
           
            var diffHoras = moment.utc(moment(end,"DD/MM/YYYY HH:mm").diff(moment(now,"DD/MM/YYYY HH:mm"))).format("HH:mm");
            this.somaHoras = diffHoras;

          }
        });
    }
    });
  }

}
