import { Component } from '@angular/core';
import { ListInmueble } from '../../../shared/components/list-inmueble/list-inmueble';
import { Finder } from "../../../shared/components/finder/finder";

@Component({
  selector: 'app-home',
  imports: [ListInmueble, Finder],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {



}
