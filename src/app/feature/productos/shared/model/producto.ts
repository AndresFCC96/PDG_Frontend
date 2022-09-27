export interface Producto {
  idproducto?: number;
  nombre: string;
  autor: string;
  categoria: string;
  fechaSubida?: string;
  tiempo?: number;
  descripcion: string;
  foto?: string;
  archivo?: string;
  tipoDeSubasta?: string;
  valoracionAutor: number;
  subastaIdsubasta?: number;
  estado?: string;
}
