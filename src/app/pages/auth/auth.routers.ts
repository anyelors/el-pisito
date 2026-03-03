import { Login } from "./login/login";
import { RegistroUsuario } from "./registro-usuario/registro-usuario";

export const AUTH_ROUTES = [

    {
        path:'login',
        component:Login
    },
    {
        path:'registro-usuario',
        component:RegistroUsuario
    }

];