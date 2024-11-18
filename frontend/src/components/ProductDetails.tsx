import { useContext, useState } from 'react';
import '../assets/product-details.css';
import { ProductModalContext } from '../lib/hooks/product-modal';
import { CartContext } from '../lib/hooks/cart';

const ProductDetails = () => {
  const { productoSeleccionado: producto, cerrarModal } = useContext(ProductModalContext);
  const { agregar } = useContext(CartContext);
  const [cantidad, setCantidad] = useState(1);

  const incrementarCantidad = () => setCantidad(prev => prev + 1);

  const disminuirCantidad = () => {
    if (cantidad > 1) {
      setCantidad(prev => prev - 1);
    }
  };

  const agregarAlCarrito = () => {
    if (producto) {
      agregar(producto, cantidad);
    }
    cerrarModal();
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="product-image-container">
          <img src={producto?.imagenUrl || "/logo192.png"} alt={producto?.nombre} className="product-image" />
        </div>
        <div className="product-info">
          <h3 className="product-title">{producto?.nombre}</h3>
          <p className="product-description">{producto?.descripcion}</p>
          <p className="product-price">Precio: ${producto?.precio}</p>
          <div className="cantidad-control">
            <button className="btn btn-outline-secondary" onClick={disminuirCantidad}>-</button>
            <input type="number" value={cantidad} readOnly className="form-control cantidad-input" />
            <button className="btn btn-outline-secondary" onClick={incrementarCantidad}>+</button>
          </div>
          <button
            className="btn btn-primary mt-3 w-100"
            onClick={agregarAlCarrito}
          >
            Añadir al Carrito
          </button>
          <button className="btn btn-danger mt-3 w-100" onClick={cerrarModal}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
