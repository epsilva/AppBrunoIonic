import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CalendarioProvider } from "../../providers/calendario/calendario";
import { Usuario } from "../../models/usuario";
import { Calendario } from "../../models/calendario";

@Component({
  selector: 'page-calendario-form',
  templateUrl: 'calendario-form.html',
})
export class CalendarioFormPage {

  usuarios:Array<Usuario>;
  listaUsuarioSelecionado:Array<Usuario>;
  calendario:Calendario;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewController: ViewController, public calendarioProvider:CalendarioProvider, public ngZone: NgZone) {
    this.usuarios = new Array<Usuario>();
    this.listaUsuarioSelecionado = new Array<Usuario>();
    this.calendario = new Calendario();
  }

  ionViewDidLoad() {
    this.recuperarUusario();
  }

  salvarEvento(){
    this.calendario.usuarioParticipante = this.listaUsuarioSelecionado;
    this.calendarioProvider.salvarEvento(this.calendario);
    this.viewController.dismiss();
  }

  recuperarUusario(){
    this.calendarioProvider.getUsuarios().on('value', (snapshot) => {
      this.ngZone.run(() => {
        this.usuarios = new Array();
        snapshot.forEach(element => {
          let el = element.val();
          this.usuarios.push(el);
        });
      });
    });
  }

  selecionado(sel){
    if(this.listaUsuarioSelecionado.indexOf(sel) != -1){
      this.listaUsuarioSelecionado.splice(this.listaUsuarioSelecionado.indexOf(sel), 1);
    }else{
      this.listaUsuarioSelecionado.push(sel);
    }
  }
}
