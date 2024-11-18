import { createContext, useEffect, useState } from "react";
import { Cart, Producto, Venta } from "../types/ventas";
import { agregarModificarVenta, cancelarVenta, obtenerProductosDisponibles, obtenerVentasEnProceso, procesarCompra } from "../ventas";

export const CartContext = createContext<Cart>({
  carrito: [],
  productosDisponibles: [],
  agregar: () => { }
});
export const CartProvider = CartContext.Provider;

export function useCart() {
  const [carrito, setCarrito] = useState<Venta[]>([]);
  const [productosDisponibles, setProductosDisponibles] = useState<Producto[]>([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  useEffect(() => {
    obtenerProductosDisponibles()
      .then((productos) => setProductosDisponibles(productos));

    actualizarCarrito();
  }, [])

  const actualizarCarrito = () => {
    obtenerVentasEnProceso()
      .then((ventas) => setCarrito(ventas))
      .catch((error) => alert(error.message));
  }

  const vaciarCarrito = () => {
    setCarrito([]);
    setMostrarCarrito(false);
  }

  const agregarProducto = async (producto: Producto, cantidad: number) => {
    const productoId = producto.producto_id;
    const ventaActualizada = await agregarModificarVenta(productoId, cantidad);
    actualizarCarrito();

    if (ventaActualizada.ok) {
      setMostrarCarrito(true);
    } else {
      alert(ventaActualizada.mensaje);
    }
  };

  const eliminarDelCarrito = (ventaId: string) => {
    if (window.confirm("¿Estás seguro de que deseas cancelar esta venta?")) {
      cancelarVenta(ventaId);
      actualizarCarrito();
    }
  };

  const cancelarCompra = () => {
    if (window.confirm("¿Estás seguro de que deseas cancelar la compra y vaciar el carrito?")) {
      procesarCompra("CANCELADO");
      vaciarCarrito();
    }
  };

  const comprar = () => {
    if (window.confirm("¿Deseas proceder con la compra?")) {
      procesarCompra("REALIZADO");
      vaciarCarrito();
    }
  };

  // Función para alternar la visibilidad del carrito
  const toggleCarrito = () => {
    setMostrarCarrito(prev => !prev);
  };

  return {
    carrito,
    productosDisponibles,
    mostrarCarrito,
    agregarProducto,
    eliminarDelCarrito,
    cancelarCompra,
    comprar,
    toggleCarrito
  };
}
