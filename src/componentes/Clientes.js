
import { useEffect, useState } from 'react';
import "../clientes.css";

function Clientes() {
const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7055/Clientes')
      .then(respuesta => respuesta.json())
      .then(json => setClientes(json));
  }, []);

  return (
    <>
     {clientes.length > 0 ? (
        <div>
          <ul>
            {clientes.map((wf) => (
              <li key={wf.id}>
                {` ${wf.id} - ${wf.nombre} ${wf.email} - ${wf.telefono}  `}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        'Cargando...'
      )}
    
    </>
  )
}

export default Clientes