export class Usuario{
    
        constructor(public nome: string = "",
                    public email: string = "",
                    public uid: string = "",
                    public vinculado: boolean = false,
                    public provider: string = "",
                    public imagemUsuario: string ="",
                    public identificacaoCliente: string = "",
                    public keyDuplicadoUsuario: string = ""){}
    }