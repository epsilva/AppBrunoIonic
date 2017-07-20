import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Documento } from '../../models/documento';
import { ListaDocumentoProvider } from '../../providers/lista-documento/lista-documento';
import { DocumentoProvider } from "../../providers/documento/documento";


@Component({
  selector: 'page-documento-form',
  templateUrl: 'documento-form.html',
})
export class DocumentoFormPage {

  documento:Documento;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     public providerListaDocumento: ListaDocumentoProvider , public documentoProvider: DocumentoProvider, public viewController: ViewController) {
    this.documento = new Documento();
  }

  ionViewDidLoad() {
    this.documento = this.navParams.get('documento');
    if(!this.documento){
      this.documento = new Documento();
    }
  }

  salvarDocumento(){
    this.documentoProvider.save(this.documento);
    this.viewController.dismiss();
  }

}
