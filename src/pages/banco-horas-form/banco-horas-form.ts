import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { BancoHorasProvider } from "../../providers/banco-horas/banco-horas";
import { BancoHoras } from "../../models/bancoHoras";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public bancoHorasProvider: BancoHorasProvider ,public ngZone: NgZone) {
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
    // if(this.horaEntrada != undefined){
    //   this.horaSaida = this.data;
    // }else{
    //   this.horaEntrada = this.data;
    // }
    
  }


  horaCurrent() {
    this.loop = setInterval(() => {
      this.data = new Date().toISOString();
      // console.log(this.data);
    }, 1000);
  }

  recuperarHoras(){
    this.bancoHorasProvider.reference.on('value', (snapshot) => {
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
          if(elemento.dataEntrada != undefined){
            this.horaEntrada = elemento.dataEntrada.toString();
          }
          if(elemento.dataSaida != undefined){
            this.horaSaida = elemento.dataSaida.toString();
          }
        });
    }
    });
  }

}
