export interface Venta {
  venta_id: string;
  producto: Producto;
  cantidad: number;
  precio: number;
}

export interface Producto {
  producto_id: string;
  precio: number;
  nombre: string;
  descripcion: string;
  descripcionCorta: string;
  imagenUrl: string;
}

export interface Cart {
  carrito: Venta[];
  productosDisponibles: Producto[];
  agregar: (producto: Producto, cantidad: number) => void;
}

export enum Estado {
  REALIZADO = "REALIZADO",
  ENPROCESO = "ENPROCESO",
  CANCELADO = "CANCELADO",
}
