import { Component } from '@angular/core';

/**
 * Generated class for the BancoHorasListItemComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'banco-horas-list-item',
  templateUrl: 'banco-horas-list-item.html'
})
export class BancoHorasListItemComponent {

  text: string;

  constructor() {
    console.log('Hello BancoHorasListItemComponent Component');
    this.text = 'Hello World';
  }

}
