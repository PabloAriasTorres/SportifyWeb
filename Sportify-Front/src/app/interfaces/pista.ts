export interface Pista {
    id: number,
    deporte_id: number,
    club_id: number,
    precio : number,
    nombre: string,
    longitud : number,
    ancho : number,
    imagen: string
}

export interface PistaResponse {
    pistas: Pista[],
    currentPage: number,
    lastPage: number
}