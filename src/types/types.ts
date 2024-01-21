export interface Product {
    id: number;
    producto: string;
    descripcion: string;
    precioObjetivo: number;
    recaudado: number;
    donantes: Colaborador[];
    imagenUrl: string;
}

export interface Colaborador {
    id: number;
    nombre: string;
    pesos: number;
    productos: Product[]
}