import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { Preloader } from "../../../shared/components/preloader/preloader";
import { FormsModule } from '@angular/forms';
import { InmuebleService } from '../../../core/services/inmueble-service';
import { PoblacionService } from '../../../core/services/poblacion-service';
import { TipoService } from '../../../core/services/tipo-service';
import { OperacionService } from '../../../core/services/operacion-service';
import { InmobiliariaService } from '../../../core/services/inmobiliaria-service';
import { Inmobiliaria, Inmueble, Operacion, Poblacion, Tipo } from '../../../core/models/entities';
import { forkJoin } from 'rxjs';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { ImagenesService } from '../../../core/services/imagenes-service';
import { ImagenDTO, InmuebleImagenDTO } from '../../../core/models/dtos';
import { EntidadImagen } from '../../../core/models/auxiliares';

@Component({
  selector: 'app-add-inmueble',
  imports: [Preloader, FormsModule, NgClass],
  templateUrl: './add-inmueble.html',
  styleUrl: './add-inmueble.css',
})
export class AddInmueble implements OnInit {

  @ViewChild('imagen') inputImagen:ElementRef;

  private _inmuebleService:InmuebleService = inject(InmuebleService);
  private _poblacionService:PoblacionService = inject(PoblacionService);
  private _tipoService:TipoService = inject(TipoService);
  private _operacionService:OperacionService = inject(OperacionService);
  private _inmobiliariaService:InmobiliariaService = inject(InmobiliariaService);
  private _imagenesService:ImagenesService = inject(ImagenesService)
  private _router:Router = inject(Router);

  imagenesSeleccionadas:FileList; //En esta variable guardamos provisionalmente las imagenes seleccioandas
  imagePreview = signal<string | ArrayBuffer | null>(null);
  labelElegirImagen:string = "ELEGIR IMAGENES";

  cargaCompletada = signal<boolean>(false);
  tipos = signal<Array<Tipo>>([]);
  inmobiliarias = signal<Array<Inmobiliaria>>([]);
  poblaciones = signal<Array<Poblacion>>([]);
  operaciones = signal<Array<Operacion>>([]);

  inmuebleImagenDTO:InmuebleImagenDTO;

inmueble:Inmueble = {

  amueblado:0,
  apertura:"",
  ascensor:0,
  descripcion:"",
  inmobiliaria:{
      nombre:"",
      representante:"",
      telefono:""
  },
  jardin:0,
  nombreVia:"",
  numero:"",
  balcones:0,
  banhos:0,
  habitaciones:0,
  operacion:{nombre:""},
  oportunidad:0,
  orientacion:"",
  piscina:0,
  planta:"",
  garajes:0,
  portada:0,
  precio:0,
  puerta:"",
  superficieConstruida:0,
  superficieUtil:0,
  tendedero:0,
  calefaccion:"",
  claim:"",
  trastero:0,
  via:"",
  poblacion: {
      nombre:"",
      cp:"",
      provincia:{
        nombre: ""
      }
	}
  ,
  tipo: {
		nombre:""
	}

}

  ngOnInit(): void {
    this.getDatos();
  }

  getDatos():void{

    //forkJoin "sincroniza" las llamadas y no "susbscribe" hasta que todas han sido resueltas
    forkJoin({

      poblaciones: this._poblacionService.getPoblaciones(),
      tipos: this._tipoService.getTipos(),
      operaciones: this._operacionService.getOperaciones(),
      inmobiliarias: this._inmobiliariaService.getInmobiliarias(),

    }).subscribe({

      next: (result) => {

        this.poblaciones.set(result.poblaciones);
        this.tipos.set(result.tipos);
        this.operaciones.set(result.operaciones);
        this.inmobiliarias.set(result.inmobiliarias);
        this.cargaCompletada.set(true);

      }
   
    });

  }// end getDatos

  add():void{

    this.inmueble.portada = Number(this.inmueble.portada);
    this.inmueble.oportunidad = Number(this.inmueble.oportunidad);
    this.inmueble.amueblado = Number(this.inmueble.amueblado);
    this.inmueble.piscina = Number(this.inmueble.piscina);
    this.inmueble.trastero = Number(this.inmueble.trastero);
    this.inmueble.ascensor = Number(this.inmueble.ascensor);
    this.inmueble.jardin = Number(this.inmueble.jardin);
    this.inmueble.tendedero = Number(this.inmueble.tendedero);
    
    this.inmueble.claim = this.inmueble.claim.toUpperCase();
    this.inmueble.nombreVia = this.inmueble.nombreVia.toUpperCase();
    this.inmueble.puerta = this.inmueble.puerta.toUpperCase();

    this._inmuebleService.addInmueble(this.inmueble).subscribe({
      next: (datos) => {
        this.inmuebleImagenDTO = datos;
        this._router.navigate(["/admin/list-inmobiliaria"]);
      }
    });

  }

}
