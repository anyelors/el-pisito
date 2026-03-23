import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InmobiliariaService } from '../../../core/services/inmobiliaria-service';
import { Inmobiliaria } from '../../../core/models/entities';
import { ImagenesService } from '../../../core/services/imagenes-service';
import { ImagenDTO, InmobiliariaImagenDTO } from '../../../core/models/dtos';
import { EntidadImagen } from '../../../core/models/auxiliares';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-inmobiliaria',
  imports: [FormsModule],
  templateUrl: './add-inmobiliaria.html',
  styleUrl: './add-inmobiliaria.css',
})
export class AddInmobiliaria {

  @ViewChild('imagen') inputImagen:ElementRef;

  private _inmobiliariaService:InmobiliariaService = inject(InmobiliariaService);
  private _imagenesService:ImagenesService = inject(ImagenesService)
  private _router:Router = inject(Router);

  imagenesSeleccionadas:FileList; //En esta variable guardamos provisionalmente las imagenes seleccioandas
  imagePreview = signal<string | ArrayBuffer | null>(null);
  labelElegirImagen:string = "ELEGIR LOGO";

  inmobiliariaImagenDTO:InmobiliariaImagenDTO;

  inmobiliaria:Inmobiliaria={

   nombre:"",
   representante:"",
   telefono:"",

  }

  add():void{

    this._inmobiliariaService.addInmobiliaria(this.inmobiliaria).subscribe({ //nos suscribimos a él

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

  onImagenSelected( event: Event ):void{
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

}
