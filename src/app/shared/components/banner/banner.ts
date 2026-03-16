import { Component, Input, OnInit, signal } from '@angular/core';
import { BannerImagenDTO, ImagenDTO } from '../../../core/models/dtos';
import { URL_MEDIA } from '../../../core/environments/globals';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-banner',
  imports: [RouterLink],
  templateUrl: './banner.html',
  styleUrl: './banner.css',
})
export class Banner implements OnInit {

  @Input() banner: BannerImagenDTO;

  imagenes = signal<ImagenDTO[]>([]);
  urlMedia: string=URL_MEDIA;

  ngOnInit(): void {
    this.imagenes.set(this.banner.imagenes);
  }

}
