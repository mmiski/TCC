export class RotaPassageiro{
    
        constructor(public passageiroKey: string = "",
                    public ordem: number = 0,
                    public segunda: boolean = false,
                    public terca: boolean = false,
                    public quarta: boolean = false,
                    public quinta: boolean = false,
                    public sexta: boolean = false,
                    public sabado: boolean = false,
                    public domingo: boolean = false){}
    }