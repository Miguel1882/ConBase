import { useEffect, useState } from "react";
import "./ClienteAlta.css";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nuevoCliente, setNuevoCliente] = useState({ nombre: "", email: "" });

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = () => {
    // fetch(`${process.env.REACT_APP_API_URL}/Clientes`)

   fetch("https://localhost:53009/Clientes/listar")
      .then((response) => response.json())
      .then((data) => {
        setClientes(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  const handleChange = (e) => {
    setNuevoCliente({ ...nuevoCliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // fetch(`${process.env.REACT_APP_API_URL}/alta`, {

fetch("https://localhost:53009/Clientes/alta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoCliente),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al guardar cliente");
        return response.json();
      })
      .then((data) => {
        setClientes([...clientes, data]); // agrega el nuevo cliente a la tabla
        setNuevoCliente({ nombre: "", email: "" }); // limpia el formulario
      })
      .catch((error) => console.error(error));
  };

  if (loading) return <p>Cargando clientes...</p>;

  return (
    <div className="clientes-container">
      <h1 className="text-xl font-bold mb-4">Alta de clientes</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="mb-6 flex gap-4">
        <input
          type="text"
          name="nombre"
          value={nuevoCliente.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
          className="border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          value={nuevoCliente.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="border p-2 rounded"
        />

        <input
          type="telefono"
          name="telefono"
          value={nuevoCliente.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
          required
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Agregar
        </button>
      </form>

      {/* Tabla */}
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id} className="text-center hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{cliente.id}</td>
              <td className="py-2 px-4 border-b">{cliente.nombre}</td>
              <td className="py-2 px-4 border-b">{cliente.email}</td>
              <td className="py-2 px-4 border-b">{cliente.telefono}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clientes;