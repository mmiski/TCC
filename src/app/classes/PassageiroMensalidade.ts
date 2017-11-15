export class PassageiroMensalidade{
    
        constructor(public mensalidadeKey: string = "",
                    public dataVencimento: string ="",
                    public diaMaxPagamento: string = "",
                    public janeiro: boolean = false,
                    public fevereiro: boolean = false,
                    public marco: boolean = false,
                    public abril: boolean = false,
                    public maio: boolean = false,
                    public junho: boolean = false,
                    public julho: boolean = false,
                    public agosto: boolean = false,
                    public setembro: boolean = false,
                    public outubro: boolean = false,
                    public novembro: boolean = false,
                    public dezembro: boolean = false){}
    }