export interface Inmobiliaria {
    id?:number;
    nombre:string;
    representante:string;
    telefono:string;
    activo?:number;
}

export interface Inmueble {
    id?:number;
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
    inmobiliaria:Inmobiliaria;
    activo?:number;
}

export interface Tipo {
    id?:number;
    nombre:string;
    activo?:number;
}

export interface Operacion {
    id?:number;
    nombre:string;
    activo?:number;
}

export interface Poblacion {
    id?:number;
    nombre:string;
    cp:string;
    provincia:Provincia;
    activo?:number;
}

export interface Provincia {
    id?:number;
    nombre:string;
    activo?:number;
}

export interface Imagen {
    id?:number;
    nombre:string;
    entidadImagen:string;
    entidadId:number;
    altImagen:string;
}

export interface Usuario {
    id?:number;
    nombre:string;
    password:string;
    email:string;
    rol?:string;
    activo?:number;
}

export interface Banner {
    id?:number;
    titular:string;
    claim:string;
    link:string;
    activo?:number;
}

export interface BannerCarousel {
    id?:number;
    titular:string;
    claim:string;
    activo?:number;
}

export interface Pagina {
    id?:number;
    nombre:string;
    activo?:number;
}

export interface Tematica {
    id?:number;
    nombre:string;
    actual?:number;
    activo?:number;
    numeroBanners?:number;
}