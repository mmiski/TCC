export class PassageiroMensalidade{
    
        constructor(public mensalidadeNome: string = "", 
                    public valor: string = "",
                    public dataVencimento: string ="",
                    public diaMaxPagamento: string = ""){}
    }