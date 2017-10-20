export class Motorista{
    
        constructor(public nome: string = "", 
                    public cpf: string = "",
                    public dataNascimento: string ="",
                    public telefone: string = "",
                    public nRegistro: string = "",
                    public dataEmissao: string = "",
                    public dataVencimento: string = "",
                    public AB: boolean = true,
                    public C: boolean = true,
                    public D: boolean = true,
                    public E: boolean = false){}
    }