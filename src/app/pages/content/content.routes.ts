import { ConsultorHipotecas } from "./consultor-hipotecas/consultor-hipotecas";
import { Contacto } from "./contacto/contacto";
import { ErrorGeneral } from "./error-general/error-general";
import { Home } from "./home/home";
import { MapaWeb } from "./mapa-web/mapa-web";
import { NuestrosServicios } from "./nuestros-servicios/nuestros-servicios";
import { PublicaAnuncio } from "./publica-anuncio/publica-anuncio";
import { SobreNosotros } from "./sobre-nosotros/sobre-nosotros";

export const CONTENT_ROUTES = [
    {
        path: '',
        component: Home
    }
    ,
    {
        path: 'home',
        component: Home
    }
    ,
    {
        path: 'publica-anuncio',
        component: PublicaAnuncio
    }
    ,
    {
        path: 'consulta-hipoteca',
        component: ConsultorHipotecas
    }
    ,
    {
        path: 'nuestros-servicios',
        component: NuestrosServicios
    }
    ,
    {
        path: 'sobre-nosotros',
        component: SobreNosotros
    }
    ,
    {
        path: 'contactar',
        component: Contacto
    }
    ,
    {
        path: 'mapa-web',
        component: MapaWeb
    }
    ,
    {
        path: 'error',
        component: ErrorGeneral
    }
];