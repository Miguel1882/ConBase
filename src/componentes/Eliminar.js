import { useEffect, useState } from "react";

function Eliminar() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = () => {
    fetch(`${process.env.REACT_APP_API_URL}/Clientes`)
      .then((response) => response.json())
      .then((data) => {
        setClientes(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };


    // 🔹 Método para eliminar un cliente
  const eliminarCliente = (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este cliente?")) return;

    fetch(`${process.env.REACT_APP_API_URL}/Clientes/${id}`, {
      method: "DELETE", // ✅ usa DELETE si tu API lo soporta
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al eliminar cliente");
        // quitar el cliente eliminado del estado sin recargar toda la lista
        setClientes(clientes.filter((c) => c.id !== id));
      })
      .catch((error) => console.error(error));
  };

  if (loading) return <p>Cargando clientes...</p>;

  return (
    <div className="clientes-container">
      <h2>Eliminar Clientes</h2>
      <table className="clientes-tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefono}</td>
              <td>
                <button
                  className="btn-eliminar"
                  onClick={() => eliminarCliente(cliente.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Eliminar;