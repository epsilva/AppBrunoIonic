import { Component, NgZone } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Documento } from "../../models/documento";
import { DocumentoProvider } from '../../providers/documento/documento';
import { DocumentoFormPage } from '../documento-form/documento-form';
import { Usuario } from "../../models/usuario";
import { LoginProvider } from "../../providers/login/login";
import firebase from 'firebase';


@Component({
  selector: 'page-documento-lista',
  templateUrl: 'documento-lista.html',
})
export class DocumentoListaPage {

  documentos: Array<Documento>;

  constructor(public documentoProvider: DocumentoProvider,
    public ngZone: NgZone, public toastCtrl: ToastController, public navCtrl: NavController, public loginProvider:LoginProvider) {
    this.documentos = new Array<Documento>();
  }

  /*
     * value - Escuta todas as alterações da referencia
     * child_added - Ouvinte para quando um filtlo for adicionado
     * child_changed - Ouvinte para quando algum filtlo for alterado
     * child_removed - Ouvinte para quando algum filho for deletado
     * child_moved - Ouvinte para ouvir as mudanças na prioridade de um filho
     */
  ionViewDidLoad() {

    this.documentoProvider.reference.on('child_removed', (snapshot) => {
      let documentoRemovida = snapshot.val();
      this.toastCtrl.create({
        message: 'Documento ' + documentoRemovida.titulo + ' removido!',
        duration: 3000
      }).present();
    });

    this.documentoProvider.reference.on('value', (snapshot) => {
      this.ngZone.run(() => {
        let innerArray = new Array();
        snapshot.forEach(element => {
          let el = element.val();
          innerArray.push(el);
        });
        this.documentos = innerArray;
      });
    });

  }

  atualizarDocumento(documento: Documento) {
    this.navCtrl.push(DocumentoFormPage, { 'documento': documento });
  }

  abrirLink(documento: Documento) {
    window.open(documento.link, "_blank");
  }

  adicionarDocumento() {
    this.navCtrl.push(DocumentoFormPage, { 'documento': new Documento() });
  }

  deletarDocumento(documento: Documento) {
    this.documentoProvider.deletar(documento).then(
      sucesso => console.log('documento deletado')
    )
      .catch(error => console.log('nao foi possivel deletar o documento'));
  }
}
