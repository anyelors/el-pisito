export interface Inmobiliaria {
    id?:number;
    nombre:string;
    representante:string;
    telefono:string;
    activo?:number;
    imagenes?:Array<Imagen>;
}

export interface Imagen {
    id:number;
    url:string;
    alt:string;
    entidadId:number;
}