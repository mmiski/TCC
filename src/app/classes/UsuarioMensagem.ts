export class UsuarioMensagem{
    
        constructor(public nome: string = "", 
                    public texto: string = "",
                    public telefone: string = "",
                    public userId: string = "",
                    public userDbId: string = "",
                    public tipo: string = "",
                    public email: string = ""){}
    }