import { useEffect, useState } from "react";

function Modificar() {
  const [clientes, setClientes] = useState([]);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [formData, setFormData] = useState({ nombre: "", email: "", telefono: "" });

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = () => {
    // fetch(`${process.env.REACT_APP_API_URL}/Clientes`)
fetch("https://localhost:53009/Clientes/listar")
      .then((response) => response.json())
      .then((data) => setClientes(data))
      .catch((error) => console.error(error));
  };

  // Maneja cambios en inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Inicia edición
  const editarCliente = (cliente) => {
    setClienteEditando(cliente.id);
    setFormData({
      id: cliente.id,
      nombre: cliente.nombre,
      email: cliente.email,
      telefono: cliente.telefono,
    });
  };

  // Guardar cambios
  const guardarCambios = (id) => {
    // fetch(`${process.env.REACT_APP_API_URL}/Clientes/${id}`, {

    fetch(`https://localhost:53009/Clientes/modificar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...formData }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al modificar cliente");
        return response.json();
      })
      .then((data) => {
        setClientes(clientes.map((c) => (c.id === id ? data : c))); // actualizar en la lista
        setClienteEditando(null); // salir del modo edición
        setFormData({ id:0, nombre: "", email: "", telefono: "" }); // limpiar
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="clientes-container">
      <h2>Modificar Clientes</h2>
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
              <td>
                {clienteEditando === cliente.id ? (
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                ) : (
                  cliente.nombre
                )}
              </td>
              <td>
                {clienteEditando === cliente.id ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                ) : (
                  cliente.email
                )}
              </td>
              <td>
                {clienteEditando === cliente.id ? (
                  <input
                    type="text"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                ) : (
                  cliente.telefono
                )}
              </td>
              <td>
                {clienteEditando === cliente.id ? (
                  <>
                    <button
                      className="btn-guardar"
                      onClick={() => guardarCambios(cliente.id)}
                    >
                      Guardar
                    </button>
                    <button
                      className="btn-cancelar"
                      onClick={() => setClienteEditando(null)}
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button
                    className="btn-editar"
                    onClick={() => editarCliente(cliente)}
                  >
                    Editar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Modificar;
