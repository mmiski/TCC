export class AreaAtuacao{
    
        constructor(public cep: string = "", 
                    public isMatutino: boolean = false,
                    public isVespertino: boolean =false,
                    public isNoturno: boolean = false,
                    public locais: string = ""){}
    }