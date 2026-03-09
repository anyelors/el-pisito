import { Component, Input, OnInit, signal } from '@angular/core';
import { ImagenDTO, InmuebleImagenDTO } from '../../../core/models/dtos';
import { URL_MEDIA } from '../../../core/environments/globals';
import { NgClass } from '@angular/common';
import { GadgetNumeroImagenes } from "../gadget-numero-imagenes/gadget-numero-imagenes";

@Component({
  selector: 'app-carousel-ficha',
  imports: [NgClass, GadgetNumeroImagenes],
  templateUrl: './carousel-ficha.html',
  styleUrl: './carousel-ficha.css',
})
export class CarouselFicha implements OnInit{
  
  @Input() datos:InmuebleImagenDTO;
  imagenes = signal<ImagenDTO[]>([]);
  urlMedia:string = URL_MEDIA;

  ngOnInit(): void {
    this.imagenes.set(this.datos.imagenes);
  }

}
