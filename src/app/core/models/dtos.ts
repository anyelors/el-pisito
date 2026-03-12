import { Operacion, Poblacion, Tipo } from "./entities";

export interface Credenciales {
  username: string;
  password: string;
}

export interface CredencialesRespuesta {
  mensaje:any;
}

export interface BannerCarouselIdDTO {
    id:number;
}

export interface BannerCarouselImagenDTO {
    id:number;
    titular:string;
    claim:string;
    activo:number;
    imagenes:Array<ImagenDTO> //ImagenDTO[];
}

export interface BannerIdDTO {
    id:number;
}

export interface BannerImagenDTO {
    id:number;
    titular:string;
    claim:string;
    link:string;
    activo:number;
    imagenes:Array<ImagenDTO> //ImagenDTO[];
}

export interface ImagenDTO {
    id:number;
    url:string;
    alt:string;
    entidadId:number;
}

export interface ErrorResponseDTO {
    timeStamp:Date;
    status:number;
    error:string;
    mensaje:string;
    message:string;
    path:string;
}

export interface InmobiliariaIdDTO {
    id:number;
}

export interface InmobiliariaImagenDTO {
    id:number;
    nombre:string;
    representante:string;
    telefono:string;
    activo:number;
    imagenes:Array<ImagenDTO> //ImagenDTO[];
}

export interface InmuebleIdDTO {
    id:number;
}

export interface InmuebleImagenDTO {
    id:number;
    via:string;
    claim:string;
    nombreVia:string;
    numero:string;
    planta:string;
    puerta:string;
    apertura:string;
    orientacion:string;
    superficieUtil:number;
    superficieConstruida:number;
    precio:number;
    habitaciones:number;
    banhos:number;
    descripcion:string;
    calefaccion:string;
    amueblado:number;
    balcones:number;
    garajes:number;
    piscina:number;
    trastero:number;
    ascensor:number;
    jardin:number;
    tendedero:number;
    portada:number;
    oportunidad:number;
    tipo:Tipo;
    operacion:Operacion;
    poblacion:Poblacion;
    inmobiliaria:InmobiliariaImagenDTO;
    activo:number;
    imagenes:Array<ImagenDTO> //ImagenDTO[];
}

export interface UsuarioDTO {
    id:number;
    nombre:string;
    rol:string;
    activo:number;
}    



