import { useEffect, useState } from "react";
import "./ClienteV.css";


function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {

fetch(`${apiUrl}/Usuarios/listar`)
      .then((respuesta) => respuesta.json())
      .then((json) => setUsuarios(json));
  }, []);

  return (
    <div className="clientes-container">
      <h2>Lista de Usuarios</h2>
      {usuarios.length > 0 ? (
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
            {usuarios.map((wf) => (
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

export default Usuarios;