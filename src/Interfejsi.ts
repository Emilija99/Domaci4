export interface Route{
    id:number,
    polaznaTacka:string,
    odredisnaTacka:string
}

export interface Polazak{
    id:number,
    vremePolaska:string,
    idRoute:number
}