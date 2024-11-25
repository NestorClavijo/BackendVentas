import '../assets/sucursal-dashboard.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from '../components/NavBar';
import ProductDetails from '../components/ProductDetails';
import { CartProvider, useCart } from '../lib/hooks/cart';
import { ProductModalProvider, useProductModal } from '../lib/hooks/product-modal';

export default function DashboardSucursal() {
  const {
    productosDisponibles,
    mostrarCarrito,
    carrito,
    toggleCarrito,
    cancelarCompra,
    eliminarDelCarrito,
    comprar,
    agregarProducto
  } = useCart();

  const { productoSeleccionado, abrirModal, cerrarModal } = useProductModal();

  return (
    <CartProvider value={{ productosDisponibles, carrito, agregar: agregarProducto }}>
      <div className="sucursal-page">
        <Navbar />
        {/* Ícono del carrito en la parte superior derecha */}
        <div className="carrito-icono" onClick={toggleCarrito}>
          <i className="fas fa-shopping-cart"></i>
          <span className="carrito-count">{carrito.length}</span>
        </div>
        {productoSeleccionado ? (
          <ProductModalProvider value={{ productoSeleccionado, abrirModal, cerrarModal }}>
            <ProductDetails />
          </ProductModalProvider>
        ) : (
          <div className="container-fluid mt-5">
            <h2 className="text-center mb-4">Productos Disponibles</h2>
            <div className="product-container">
              {productosDisponibles.map((producto) => (
                <div
                  className="col"
                  key={producto.producto_id}
                >
                  <div
                    className="card h-100"
                    onClick={() => abrirModal(producto)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img src="images/se-esta-acabando-el-anio.jpg" alt={producto.nombre} className="card-img" />
                    <div className="card-body">
                      <h5 className="card-title">{producto.nombre}</h5>
                      <p className="card-text">Precio: ${producto.precio}</p>
                      <p className="card-text">{producto.descripcionCorta}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {mostrarCarrito && (
          <div className={`carrito-compras ${mostrarCarrito ? 'carrito-visible' : ''}`}>
            <h2 className="text-center">Carrito de Compras</h2>
            <div className="cart-items">
              {carrito.length === 0 ? (
                <p className="text-center">El carrito está vacío</p>
              ) : (
                <table className="table mt-3">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                        carrito.map((item, index) => (
                          <tr key={index}>
                            <td>{item.producto.nombre}</td>
                            <td>${item.precio}</td>
                            <td>{item.cantidad}</td>
                            <td>${item.precio * item.cantidad}</td>
                            <td>
                              <button className="btn btn-danger btn-sm" onClick={() => eliminarDelCarrito(item.venta_id)}>
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))
                      }
                  </tbody>
                </table>
              )}
            </div>
            {carrito.length > 0 && (
              <div className="cart-buttons">
                <button className="btn btn-comprar" onClick={comprar}>Comprar</button>
                <button
                  className="btn btn-cancelar"
                  onClick={cancelarCompra}
                >
                  Cancelar Compra
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </CartProvider>
  );
}
