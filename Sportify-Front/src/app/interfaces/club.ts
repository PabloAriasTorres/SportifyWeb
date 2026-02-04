export interface Club {
    cId: number;
    dDireccion: string;
    cNombre: string;
    pNombre: string;
    pId: number;
    dNombre: string;
    pImagen: string;
    pPrecio: number;
}

export interface ClubCms {
  id: number;
  nombre: string;
  direccion: string;
  localidad: string;
  telefono: string;
}

export interface ClubResponse {
  clubs: ClubCms[];
  currentPage: number;
  lastPage: number;
}

export interface ClubSelect{
  cId: number,
  cNombre: string
}