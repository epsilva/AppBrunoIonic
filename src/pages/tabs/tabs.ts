import { Component } from '@angular/core';
import { DocumentoListaPage } from "../documento-lista/documento-lista";
import { ConfiguracoesPage } from "../configuracoes/configuracoes";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = DocumentoListaPage;
  tab2Root = ConfiguracoesPage;

  constructor() {

  }
}
