import { useEffect, useState } from "react";
import "../clientes.css";

function Clientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7055/Clientes")
      .then((respuesta) => respuesta.json())
      .then((json) => setClientes(json));
  }, []);

  return (
    <div className="clientes-container">
      <h2>Lista de Clientes</h2>
      {clientes.length > 0 ? (
        <table className="clientes-tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((wf) => (
              <tr key={wf.id}>
                <td>{wf.id}</td>
                <td>{wf.nombre}</td>
                <td>{wf.email}</td>
                <td>{wf.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default Clientes;

