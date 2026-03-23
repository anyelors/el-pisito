import { Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { InmobiliariaService } from '../../../core/services/inmobiliaria-service';
import { ImagenesService } from '../../../core/services/imagenes-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Inmobiliaria } from '../../../core/models/entities';
import { ImagenDTO, InmobiliariaImagenDTO } from '../../../core/models/dtos';
import { map, Subscription, switchMap } from 'rxjs';
import { Preloader } from "../../../shared/components/preloader/preloader";
import { EntidadImagen } from '../../../core/models/auxiliares';
import { URL_MEDIA } from '../../../core/environments/globals';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-inmobiliaria',
  imports: [Preloader, FormsModule],
  templateUrl: './edit-inmobiliaria.html',
  styleUrl: './edit-inmobiliaria.css',
})
export class EditInmobiliaria implements OnInit, OnDestroy {

  @ViewChild('imagen') inputImagen:ElementRef;

  private _inmobiliariaService:InmobiliariaService = inject(InmobiliariaService);
  private _imagenesService:ImagenesService = inject(ImagenesService)
  private _route:ActivatedRoute = inject(ActivatedRoute);
  private _router:Router = inject(Router);

  imagenesSeleccionadas:FileList; //En esta variable guardamos provisionalmente las imagenes seleccioandas
  imagePreview = signal<string | ArrayBuffer | null>(null);
  labelElegirImagen:string = "ELEGIR LOGO";
  
  cargaCompletada = signal<boolean>(false);
  hayImagen = signal<boolean>(false);
  inmobiliaria:Inmobiliaria={
    id:0,
    activo:0,
    nombre:"",
    representante:"",
    telefono:""
  }
  inmobiliariaImagenDTO:InmobiliariaImagenDTO;
  id:number;
  idImagen:number;
  suscripcion:Subscription;
  url:string = URL_MEDIA;

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  ngOnInit(): void {

    this.getDatos();
  }

  getDatos():void{

    //Este patrón es el más recomendable cuando se trata de extraer parámetros de la URL
    this.suscripcion = this._route.paramMap.pipe( //paramMap emite cuando cambia la ruta

      map( params => this.id = Number(params.get("id"))) //extrae id de la ruta (es un string)
      ,
      switchMap( id => this._inmobiliariaService.getInmobiliaria(id)) //utilizamos el resultado del map (id). Aquí estamos completamente seguros de que tenemos el id

    ).subscribe({ //nos suscribimos al resultado del pipe (un pipe siempre devuelve un Observable)

        next: (datos:InmobiliariaImagenDTO) => {
          this.inmobiliariaImagenDTO=datos;

          if(this.inmobiliariaImagenDTO.imagenes[0]) {
            this.idImagen = this.inmobiliariaImagenDTO.imagenes[0].id;
            this.hayImagen.set(true);
          }  

          this.cargaCompletada.set(true);
        }

      });

  }//end getDatos

  edit():void{

    this.inmobiliaria.id = this.inmobiliariaImagenDTO.id;
    this.inmobiliaria.nombre = this.inmobiliariaImagenDTO.nombre;
    this.inmobiliaria.representante = this.inmobiliariaImagenDTO.representante;
    this.inmobiliaria.telefono = this.inmobiliariaImagenDTO.telefono;
    this.inmobiliaria.activo = Number(this.inmobiliariaImagenDTO.activo);

    this._inmobiliariaService.updateInmobiliaria(this.inmobiliaria).subscribe({ //nos suscribimos a él

      next: (datos:InmobiliariaImagenDTO) => {
        this.inmobiliariaImagenDTO  = datos;
        if (!this.uploadImagen(this.inmobiliariaImagenDTO))
          this._router.navigate(["/admin/list-inmobiliaria"]);
      }
    });

  }

  sustituirImagen():void{ //...cuando ya la has elegido y te arrepientes...y quieres poner otra antes de crearla

    this.inputImagen.nativeElement.value=""; //Vaciamos el input
    this.imagenesSeleccionadas = this.inputImagen.nativeElement.value; //Vaciamos imagenesSeleccionadas
    this.imagePreview.set(null);
    this.labelElegirImagen = "ELEGIR LOGO";

  }

  onImagenSelected( ):void{
    //Guardamos provisionalmente las imagenes seleccionadas sin enviarlas al servidor
    this.imagenesSeleccionadas = this.inputImagen.nativeElement.files;  //event.target.files
    const file = this.imagenesSeleccionadas[0];

    /* const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0]; */

    if (file && file.type.startsWith('image/jpeg')) {
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview.set(reader.result);
      };

      reader.readAsDataURL(file);//El readAsDataURL convierte la imagen en una URI base64 que puede usarse como src en un <img>. La imagen se renderiza en el thumbnail de imagen

      this.labelElegirImagen = "LOGO SELECCIONADO";

    }else {
        this.imagePreview.set(null); // Si no es una imagen reseteamos la variable
    }
  }

  uploadImagen(inmobiliariaImagenDTO:InmobiliariaImagenDTO):boolean{

    if(this.imagenesSeleccionadas){

      const formData:FormData = new FormData();

      formData.append("file",this.imagenesSeleccionadas[0]);
      formData.append("entidadImagen",EntidadImagen.INMOBILIARIA);
      formData.append("entidadId",String(inmobiliariaImagenDTO.id));
      formData.append("alt",`logo de la inmobiliaria ${inmobiliariaImagenDTO.nombre}`);

      this._imagenesService.uploadImagen(formData).subscribe({
        next: (datos:ImagenDTO) => {this._router.navigate(["/admin/list-inmobiliaria"]);}
      })

      return true;

    }

    return false;

  }

  eliminarImagen():void{

    this.hayImagen.set(false);
    this.inmobiliariaImagenDTO.imagenes = [];

    if(this.idImagen){

      this._imagenesService.deleteImagen(this.idImagen).subscribe({
        next:(datos) => {this.sustituirImagen();}
      });

    }

  }

}
