import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar estilos de Bootstrap
import React, { useState } from 'react';
import '../assets/GerenteDashboard.css';

function Gerencia() {
  const [sucursal, setSucursal] = useState('sucursal1');
  const [informeData, setInformeData] = useState([]);
  const [showInforme, setShowInforme] = useState(false);

  // Función para generar el informe con datos del backend
  const generarInforme = async () => {
    if (sucursal !== 'sucursal1') {
      alert("Seleccione la sucursal correcta");
      return;
    }

    try {
      // Llamada al endpoint para obtener el informe
      const response = await axios.get('http://localhost:8080/api/venta/informe');
      setInformeData(response.data); // Guardar los datos en el estado
      setShowInforme(true); // Mostrar el informe
    } catch (error) {
      console.error("Error al generar el informe:", error);
      alert("Hubo un error al generar el informe. Por favor, intenta nuevamente.");
    }
  };

  // Función para ocultar el informe
  const ocultarInforme = () => {
    setShowInforme(false);
  };

  return (
    <div>
      {/* Encabezado */}
      <header className="header">
        <h1 className="header-title">Gerencia - Informe de Ventas</h1>
      </header>

      <div className="container my-4">
        {/* Formulario para seleccionar la sucursal y generar informe */}
        <div className="card p-4 shadow-sm border-0">
          <h2 className="text-center mb-3 text-success">Generar Informe</h2>
          <form>
            <div className="mb-3">
              <label className="form-label">Seleccionar Sucursal:</label>
              <select
                className="form-select"
                value={sucursal}
                onChange={(e) => setSucursal(e.target.value)}
              >
                <option value="sucursal1">Sucursal 1</option>
                <option value="sucursal2">Sucursal 2</option>
              </select>
            </div>
            <div className="text-center">
              <button type="button" className="btn btn-primary" onClick={generarInforme}>
                Generar
              </button>
            </div>
          </form>

          {/* Tabla de informe */}
          {showInforme && (
            <div className="table-responsive mt-4">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="text-center mt-4">Informe de Sucursal {sucursal.slice(-1)}</h3>
                <button className="btn btn-secondary" onClick={ocultarInforme}>
                  Ocultar Informe
                </button>
              </div>
              <table className="table table-bordered mt-3 custom-table">
                <thead>
                  <tr>
                    <th>Nombre del Producto</th>
                    <th>Total Vendido</th>
                  </tr>
                </thead>
                <tbody>
                  {informeData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.nombreProducto}</td>
                      <td>{item.cantidadVendida}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Gerencia;
