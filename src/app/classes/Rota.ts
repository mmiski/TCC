export class Rota{
    
        constructor(public descricao: string = "",
                    public horaInicio: string ="",
                    public horaTermino: string = "",                  
                    public iniciada: boolean = false,
                    public motoristaKeyTemp: string = ""){}
    }