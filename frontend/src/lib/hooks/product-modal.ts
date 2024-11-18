import { createContext, useState } from "react";
import type { Producto } from "../types/ventas";

interface ProductModalContext {
  productoSeleccionado: Producto | null;
  abrirModal: (product: Producto) => void;
  cerrarModal: () => void;
}

export const ProductModalContext = createContext<ProductModalContext>({
  productoSeleccionado: null,
  abrirModal: () => {},
  cerrarModal: () => {},
})
export const ProductModalProvider = ProductModalContext.Provider;

export function useProductModal() {
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);

  const abrirModal = (product: Producto) => {
    setProductoSeleccionado(product);
  };

  const cerrarModal = () => {
    setProductoSeleccionado(null);
  };

  return {
    productoSeleccionado,
    abrirModal,
    cerrarModal,
  };
}
