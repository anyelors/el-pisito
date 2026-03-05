import { adminGuard } from "../../core/guards/admin-guard";
import { baseGuard } from "../../core/guards/base-guard";
import { superadminGuard } from "../../core/guards/superadmin-guard";
import { usuarioGuard } from "../../core/guards/usuario-guard";
import { AddBannerCarousel } from "./add-banner-carousel/add-banner-carousel";
import { AddBanner } from "./add-banner/add-banner";
import { AddInmobiliaria } from "./add-inmobiliaria/add-inmobiliaria";
import { AddInmueble } from "./add-inmueble/add-inmueble";
import { AddOperacion } from "./add-operacion/add-operacion";
import { AddPagina } from "./add-pagina/add-pagina";
import { AddPoblacion } from "./add-poblacion/add-poblacion";
import { AddProvincia } from "./add-provincia/add-provincia";
import { AddTematica } from "./add-tematica/add-tematica";
import { AddTipo } from "./add-tipo/add-tipo";
import { AddUsuario } from "./add-usuario/add-usuario";
import { AdminTematica } from "./admin-tematica/admin-tematica";
import { EditBannerCarousel } from "./edit-banner-carousel/edit-banner-carousel";
import { EditBanner } from "./edit-banner/edit-banner";
import { EditInmobiliaria } from "./edit-inmobiliaria/edit-inmobiliaria";
import { EditInmueble } from "./edit-inmueble/edit-inmueble";
import { EditOperacion } from "./edit-operacion/edit-operacion";
import { EditPagina } from "./edit-pagina/edit-pagina";
import { EditPoblacion } from "./edit-poblacion/edit-poblacion";
import { EditProvincia } from "./edit-provincia/edit-provincia";
import { EditTematica } from "./edit-tematica/edit-tematica";
import { EditTipo } from "./edit-tipo/edit-tipo";
import { EditUsuario } from "./edit-usuario/edit-usuario";
import { ListBannerCarousel } from "./list-banner-carousel/list-banner-carousel";
import { ListBanner } from "./list-banner/list-banner";
import { ListInmobiliaria } from "./list-inmobiliaria/list-inmobiliaria";
import { ListInmueble } from "./list-inmueble/list-inmueble";
import { ListOperacion } from "./list-operacion/list-operacion";
import { ListPagina } from "./list-pagina/list-pagina";
import { ListPoblacion } from "./list-poblacion/list-poblacion";
import { ListProvincia } from "./list-provincia/list-provincia";
import { ListTematica } from "./list-tematica/list-tematica";
import { ListTipo } from "./list-tipo/list-tipo";
import { ListUsuario } from "./list-usuario/list-usuario";

export const ADMIN_ROUTES = [
    {
        path:"add-banner",
        component:AddBanner,
        canActivate:[baseGuard, adminGuard]
    },
    {
        path:"edit-banner/:id",
        component:EditBanner,
        canActivate:[baseGuard, adminGuard]
    },
    {
        path:"list-banner",
        component:ListBanner,
        canActivate:[baseGuard, adminGuard]
    },
    {
        path:"add-banner-carousel",
        component:AddBannerCarousel,
        canActivate:[baseGuard, adminGuard]
    },
    {
        path:"edit-banner-carousel/:id",
        component:EditBannerCarousel,
        canActivate:[baseGuard, adminGuard]
    },
    {
        path:"list-banner-carousel",
        component:ListBannerCarousel,
        canActivate:[baseGuard, adminGuard]
    },
    {
        path:"add-inmobiliaria",
        component:AddInmobiliaria,
        canActivate:[baseGuard, adminGuard]
    },
    {
        path:"edit-inmobiliaria/:id",
        component:EditInmobiliaria,
        canActivate:[baseGuard, adminGuard]
    },
    {
        path:"list-inmobiliaria",
        component:ListInmobiliaria,
        canActivate:[baseGuard, adminGuard]
    },
    {
        path:"add-inmueble",
        component:AddInmueble,
        canActivate:[baseGuard, adminGuard]
    },
    {
        path:"edit-inmueble/:id",
        component:EditInmueble,
        canActivate:[baseGuard, adminGuard]
    },
    {
        path:"list-inmueble",
        component:ListInmueble,
        canActivate:[baseGuard, adminGuard]
    },
    {
        path:"add-operacion",
        component:AddOperacion,
        canActivate:[baseGuard, adminGuard]
    },
    {
        path:"edit-operacion/:id",
        component:EditOperacion,
        canActivate:[baseGuard, adminGuard]
    },
    {
        path:"list-operacion",
        component:ListOperacion,
        canActivate:[baseGuard, adminGuard]
    },
    {
        path:"add-pagina",
        component:AddPagina,
        canActivate:[baseGuard, adminGuard]
    },
    {
        path:"edit-pagina/:id",
        component:EditPagina,
        canActivate:[baseGuard, adminGuard]
    },
    {
        path:"list-pagina",
        component:ListPagina,
        canActivate:[baseGuard, adminGuard]
    },
    {
        path:"add-poblacion",
        component:AddPoblacion,
        canActivate:[baseGuard, adminGuard]
    },
    {
        path:"edit-poblacion/:id",
        component:EditPoblacion,
        canActivate:[baseGuard, adminGuard]
    },
    {
        path:"list-poblacion",
        component:ListPoblacion,
        canActivate:[baseGuard, adminGuard]
    },
    {
        path:"add-provincia",
        component:AddProvincia,
        canActivate:[baseGuard, adminGuard]
    },
    {
        path:"edit-provincia/:id",
        component:EditProvincia,
        canActivate:[baseGuard, adminGuard]
    },
    {
        path:"list-provincia",
        component:ListProvincia,
        canActivate:[baseGuard, adminGuard]
    },
    {
        path:"add-tematica",
        component:AddTematica,
        canActivate:[baseGuard, adminGuard]
    },
    {
        path:"edit-tematica/:id",
        component:EditTematica,
        canActivate:[baseGuard, adminGuard]
    },
    {
        path:"list-tematica",
        component:ListTematica,
        canActivate:[baseGuard, adminGuard]
    },
    {
        path:"admin-tematica",
        component:AdminTematica,
        canActivate:[baseGuard, superadminGuard]
    },
    {
        path:"add-tipo",
        component:AddTipo,
        canActivate:[baseGuard, adminGuard]
    },
    {
        path:"edit-tipo/:id",
        component:EditTipo,
        canActivate:[baseGuard, adminGuard]
    },
    {
        path:"list-tipo",
        component:ListTipo,
        canActivate:[baseGuard, adminGuard]
    },
    {
        path:"add-usuario",
        component:AddUsuario,
        canActivate:[baseGuard, superadminGuard]
    },
    {
        path:"edit-usuario/:id",
        component:EditUsuario,
        canActivate:[baseGuard, superadminGuard]
    },
    {
        path:"list-usuario",
        component:ListUsuario,
        canActivate:[baseGuard, superadminGuard]
    }
];