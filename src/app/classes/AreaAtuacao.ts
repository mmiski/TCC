export class AreaAtuacao{
    
        constructor(public cep: string = "", 
                    public descricao = "",
                    public isMatutino: boolean = true,
                    public isVespertino: boolean = true,
                    public isNoturno: boolean = true,
                    public locais: string = ""){}
    }