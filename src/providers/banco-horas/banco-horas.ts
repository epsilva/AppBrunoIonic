import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoginProvider } from '../login/login';
import firebase from 'firebase';
import { BancoHoras } from "../../models/bancoHoras";
import * as moment from 'moment';

@Injectable()
export class BancoHorasProvider {

  reference;
  bancoHoras: BancoHoras;
  listaHoras: Array<BancoHoras> = new Array();

  constructor(public http: Http, public loginProvider: LoginProvider) {
    console.log('Hello BancoHorasProvider Provider');
    this.initialize();
  }

  ionViewDidLoad(){
    this.initialize();
  }

  private initialize() {
    this.reference = firebase.database().ref('/bancoHoras/'+this.loginProvider.currentUser.uid);
    this.recuperarHoras();
  }

  save(data) {
    this.bancoHoras = new BancoHoras();
    let refKey;

    this.recuperarHoras();

     console.log(this.listaHoras.length);
      // update
      if (this.listaHoras.length > 0) {
        this.listaHoras.forEach(elemento => {
          console.log(elemento.dataSaida);
          if(elemento.dataSaida == undefined){
            this.bancoHoras = elemento;
            this.bancoHoras.dataSaida = moment().format('LLL');
            refKey = elemento.id;
          }else{
            refKey = this.reference.push().key;
            this.bancoHoras.dataEntrada = moment().format('LLL');
            this.bancoHoras.id = refKey;
          }
        });
      } else {
        // insert
        refKey = this.reference.push().key;
        this.bancoHoras.dataEntrada = moment().format('LLL');
        this.bancoHoras.id = refKey;
      }

      this.reference.child(refKey).update(this.bancoHoras);
  }

  recuperarHoras():Array<BancoHoras>{
    this.reference.on('value', (snapshot) => {
        let innerArray = new Array();
        snapshot.forEach(element => {
          let el = element.val();
          innerArray.push(el);
          this.listaHoras = innerArray;    
        });
    });

    return this.listaHoras;
  }

  getReference(){
    this.reference = firebase.database().ref('/bancoHoras/'+this.loginProvider.currentUser.uid);
    return this.reference;
  }

}
