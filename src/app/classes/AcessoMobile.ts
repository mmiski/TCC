import { ETipoUsuario } from "../enumerator/etipo-usuario.enum";

export class AcessoMobile{
    
        constructor(public usuarioKey: string = "", 
                    public clienteKey: string = "",
                    public tipoUsuario: ETipoUsuario,
                    public codigo: string = "",
                    public ultimoAcesso: string= "",
                    public dispositivoUltimoAcesso: string = ""){}
    }