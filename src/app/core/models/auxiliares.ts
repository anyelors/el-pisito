export interface FinderData {
    idTipo:number;
    idPoblacion:number;
    idOperacion:number;
}

export interface ModalData {
    titulo?:string;
    mensaje?:string;
    imagen?:string;
}

export enum EntidadImagen {
    INMOBILIARIA = 'INMOBILIARIA',
    INMUEBLE = 'INMUEBLE',
    BANNER = 'BANNER',
    BANNER_CAROUSEL = 'BANNER_CAROUSEL'
}