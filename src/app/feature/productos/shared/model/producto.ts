export interface Producto {
  idproducto?: number;
  nombre: string;
  autor: string;
  categoria: string;
  fechaSubida?: Date;
  descripcion: string;
  foto?: string;
  archivo?: string;
  valoracionAutor: number;
  subastaIdsubasta?: number;
  estado?: string;
}
