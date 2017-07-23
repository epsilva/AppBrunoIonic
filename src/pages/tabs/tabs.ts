import { Component } from '@angular/core';
import { DocumentoListaPage } from "../documento-lista/documento-lista";
import { ConfiguracoesPage } from "../configuracoes/configuracoes";
import { BancoHorasListaPage } from "../banco-horas-lista/banco-horas-lista";
import { CalendarioPage } from "../calendario/calendario";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = DocumentoListaPage;
  tab2Root = BancoHorasListaPage;
  tab3Root = CalendarioPage;
  tab5Root = ConfiguracoesPage;

  constructor() {

  }
}
