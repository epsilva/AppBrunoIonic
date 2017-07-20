import { Component, Input } from '@angular/core';
import { Documento } from "../../models/documento";

@Component({
  selector: 'documento-lista-item',
  templateUrl: 'documento-lista-item.html'
})
export class DocumentoListaItemComponent {

  @Input()
  documento:Documento;

}
