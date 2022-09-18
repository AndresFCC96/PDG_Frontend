export interface Cliente {
  nombre?: string;
  apellidos?: string;
  cedula?: number;
  telefono?: string;
  contra: string;
  recontra?: string;
  foto?: string;
  email: string;
  estado?: string;
  fechaCreacion?: Date;
  fechaModificacion?: Date;
  usuarioModificacion?: string;
  rol?: string;
}
