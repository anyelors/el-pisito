import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gadget-numero-imagenes',
  imports: [],
  templateUrl: './gadget-numero-imagenes.html',
  styleUrl: './gadget-numero-imagenes.css',
})
export class GadgetNumeroImagenes {

  @Input() numeroImagenes:number;

}
