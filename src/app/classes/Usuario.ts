export class Usuario{
    
        constructor(public nome: string = "",
                    public email: string = "",
                    public uid: string = "",
                    public bloqueado: boolean = false,
                    public imagemUsuario: string ="",
                    public identificacaoCliente: string = "",
                    public keyDuplicadoUsuario: string = ""){}
    }