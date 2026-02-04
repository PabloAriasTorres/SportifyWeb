export interface UsuarioRegistro {
    id?: number,
    nombre: string,
    telefono: string,
    email: string,
    contrasenya: string
}

export interface UsuarioLogin {
    email: string,
    contrasenya: string
}

export interface UsuarioResponse{
    usuarios: UsuarioRegistro[],
    currentPage: number,
    lastPage: number
}