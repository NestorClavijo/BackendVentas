import Swal from "sweetalert2";
import { API_URL } from "./consts";
import { Venta } from "./types/ventas";

export async function obtenerProductosDisponibles() {
  const response = await fetch(`${API_URL}/api/producto/all`);

  return await response.json();
}

export async function obtenerVentasEnProceso() {
  const clienteId = localStorage.getItem('userId');
  if (!clienteId) {
    throw new Error("Error: No se ha encontrado el ID del cliente. Por favor, inicie sesión nuevamente.");
  }

  try {
    const response = await fetch(`${API_URL}/api/venta/${clienteId}`);
    const data = await response.json();

    const ventas: Venta[] = data.map((venta: any) => ({
      venta_id: venta.venta_id,
      producto: venta.producto,
      cantidad: venta.cantidad,
      precio: venta.producto.precio,
    }));

    return ventas;
  } catch {
    throw new Error("No se pudieron obtener las ventas en proceso. Por favor, intente nuevamente.");
  }
}

// TODO: actualizar carrito despues de esto
export async function agregarModificarVenta(productoId: string, cantidad: number) {
  const clienteId = localStorage.getItem('userId');

  if (!clienteId) {
    return {
      ok: false,
      mensaje: "No se encontró el ID del cliente. Por favor, inicie sesión nuevamente."
    }
  }

  const ventaData = {
    productoId: productoId,
    cantidad: cantidad,
    clienteId: clienteId,
  };

  try {
    const response = await fetch(`${API_URL}/api/venta/nueva`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ventaData)
    });
    const data = await response.json();

    return {
      ok: !!data,
      mensaje: "Venta actualizada con éxito."
    };
  } catch {
    return {
      ok: false,
      mensaje: "No se pudo actualizar la venta. Por favor, intente nuevamente."
    }
  }
};

// TODO: actualizar carrito despues de esto
export async function cancelarVenta(ventaId: string) {
  try {
    await fetch(`${API_URL}/api/venta/cancelar/${ventaId}`, {
      method: 'POST'
    });
  } catch {
    throw new Error("No se pudo cancelar la venta. Por favor, intente nuevamente.");
  }
}

// TODO: borrar carrito despues de esto y dejar de mostrarlo
export async function procesarCompra(estado: string) {
  const clienteId = localStorage.getItem('userId');
  if (!clienteId) {
    //alert("No se encontró el ID del cliente. Por favor, inicie sesión nuevamente.");
    Swal.fire({
      title: "Oops...",
      text: "No se encontró el ID del cliente. Por favor, inicie sesión nuevamente.",
      icon: "error",
    });
    return;
  }

  const facturaData = {
    cliente_id: clienteId,
    fecha_hora: new Date().toISOString(),
    estado: estado,
  };

  try {
    await fetch(`${API_URL}/api/factura/nueva`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(facturaData)
    });

    if (estado === "REALIZADO") {
      return {
        ok: true,
        mensaje: "Compra realizada con éxito."
      }
    } else if (estado === "CANCELADO") {
      return {
        ok: true,
        mensaje: "Compra cancelada. Los productos han sido removidos del carrito."
      }
    }

    await obtenerVentasEnProceso();
  } catch {
    return {
      ok: false,
      mensaje: "No se pudo procesar la factura. Intente nuevamente."
    }
  }
};
