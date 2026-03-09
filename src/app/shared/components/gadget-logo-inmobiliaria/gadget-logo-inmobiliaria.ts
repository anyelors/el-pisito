import { Component, Input } from '@angular/core';
import { Inmobiliaria } from '../../../core/models/entities';

@Component({
  selector: 'app-gadget-logo-inmobiliaria',
  imports: [],
  templateUrl: './gadget-logo-inmobiliaria.html',
  styleUrl: './gadget-logo-inmobiliaria.css',
})
export class GadgetLogoInmobiliaria {

  @Input() inmobiliaria:Inmobiliaria;

}
