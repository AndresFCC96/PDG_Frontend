import { Cliente } from "src/app/feature/dashboard/shared/model/cliente";
import { Producto } from "src/app/feature/productos/shared/model/producto";

export interface Ofertas {
  idOferta?: number;
  clienteOferta?: number;
  clienteResponsable?: number;
  producto: number;
  valorOferta: number;
  nombreClienteOferta: string;
  estado?: string;
}
