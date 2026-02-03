import { Component } from '@angular/core';
import { CabeceraFooter } from '../cabecera-footer/cabecera-footer';
import { MenuFooter } from '../menu-footer/menu-footer';
import { SocialMediaFooter } from '../social-media-footer/social-media-footer';
import { PieFooter } from '../pie-footer/pie-footer';

@Component({
  selector: 'app-footer',
  imports: [CabeceraFooter,MenuFooter,SocialMediaFooter,PieFooter],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {

}
