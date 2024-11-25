import { createContext, useEffect, useState } from "react";
import { Cart, Producto, Venta } from "../types/ventas";
import { agregarModificarVenta, cancelarVenta, obtenerProductosDisponibles, obtenerVentasEnProceso, procesarCompra } from "../ventas";
import Swal from 'sweetalert2';

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

    console.log(ventaActualizada);

    if (ventaActualizada.ok === true) {
      setMostrarCarrito(true);
      Swal.fire({
        icon: 'success',
        title: "¡Enhorabuena!",
        text: ventaActualizada.mensaje
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: "Oops...",
        text: ventaActualizada.mensaje
      })
      //alert(ventaActualizada.mensaje);
    }
  };

  const eliminarDelCarrito = (ventaId: string) => {
    // if (window.confirm("¿Estás seguro de que deseas cancelar esta venta?")) {
    //   cancelarVenta(ventaId).then(() => actualizarCarrito());
    // }

    Swal.fire({
      title: "¿Estás seguro de que deseas cancelar esta venta?",
      text: "No puedes revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        cancelarVenta(ventaId).then(() => actualizarCarrito());
      }
    });
  };

  const cancelarCompra = () => {
    // if (window.confirm("¿Estás seguro de que deseas cancelar la compra y vaciar el carrito?")) {
    //   procesarCompra("CANCELADO").then(() => vaciarCarrito());
    // }

    Swal.fire({
      title: "¿Estás seguro de que deseas cancelar la compra y vaciar el carrito?",
      text: "No puedes revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, vaciar"
    }).then((result) => {
      if (result.isConfirmed) {
        procesarCompra("CANCELADO").then(() => vaciarCarrito());
      }
    });
  };

  const comprar = () => {
    // if (window.confirm("¿Deseas proceder con la compra?")) {
    //   procesarCompra("REALIZADO").then(() => vaciarCarrito());
    // }

    Swal.fire({
      title: "¿Deseas proceder con la compra?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Comprar"
    }).then((result) => {
      if (result.isConfirmed) {
        procesarCompra("REALIZADO").then(() => vaciarCarrito());
      }
    });
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
