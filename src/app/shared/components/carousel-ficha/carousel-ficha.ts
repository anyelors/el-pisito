import { Component, Input, OnInit, signal } from '@angular/core';
import { ImagenDTO, InmuebleImagenDTO } from '../../../core/models/dtos';
import { URL_MEDIA } from '../../../core/environments/globals';
import { NgClass } from '@angular/common';
import { GadgetNumeroImagenes } from "../gadget-numero-imagenes/gadget-numero-imagenes";
import { GadgetLogoInmobiliaria } from "../gadget-logo-inmobiliaria/gadget-logo-inmobiliaria";

@Component({
  selector: 'app-carousel-ficha',
  imports: [NgClass, GadgetNumeroImagenes, GadgetLogoInmobiliaria],
  templateUrl: './carousel-ficha.html',
  styleUrl: './carousel-ficha.css',
})
export class CarouselFicha implements OnInit{
  
  @Input() datos:InmuebleImagenDTO;
  @Input() dondeEstoy:string;

  imagenes = signal<ImagenDTO[]>([]);
  urlMedia:string = URL_MEDIA;

  ngOnInit(): void {
    this.imagenes.set(this.datos.imagenes);
  }

}
