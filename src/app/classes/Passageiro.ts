export class Passageiro{
    
        constructor(public nome: string = "", 
                    public cpf: string = "",
                    public dataNascimento: string ="",
                    public telefone: string = "",
                    public email: string = "",
                    public endereco: string = "",
                    public descricaoPosicao: string = "Sem Descrição",
                    public longitude: number = -52.6721232,
                    public latitude: number = -26.225484){}
    }