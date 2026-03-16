import { adminGuard } from "../../core/guards/admin-guard";
import { baseGuard } from "../../core/guards/base-guard";
import { ConsultorHipotecas } from "./consultor-hipotecas/consultor-hipotecas";
import { Contacto } from "./contacto/contacto";
import { ErrorGeneral } from "./error-general/error-general";
import { FavoritosUsuario } from "./favoritos-usuario/favoritos-usuario";
import { Home } from "./home/home";
import { Inmobiliaria } from "./inmobiliaria/inmobiliaria";
import { InmueblesFinder } from "./inmuebles-finder/inmuebles-finder";
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
        path: 'consultor-hipotecas',
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
    },
    {
        path: 'favoritos-usuario',
        component: FavoritosUsuario,
        canActivate:[baseGuard, adminGuard]
    },
    {
        path: 'finder/:idTipo/:idPoblacion/:idOperacion',
        component: InmueblesFinder
    },
    {
        path: 'inmobiliaria/:id',
        component: Inmobiliaria
    },
    {
        path: 'error',
        component: ErrorGeneral
    }
    
];