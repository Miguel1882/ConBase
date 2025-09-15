import { useState } from "react";
import Alta from "./ClienteAlta";
import Listar from "./Clientes";
import Modificar from "./Modificar";
import Eliminar from "./Eliminar";
import Weather from "./Weather";
import Usuarios from "./Usuarios";
import "./CabeceraV.css";

function Cabecera() {
  const [componente, setComponente] = useState(null);

  return (
    <div>
      <div className="cabecera">
        {/* <h2 className="titulo">Sistema control de clientes</h2> */}
        <div className="enlaces">
          <button className="btn" onClick={() => setComponente("ClienteAlta")}>Alta</button>
          <button className="btn" onClick={() => setComponente("Clientes")}>Listar</button>
          <button className="btn" onClick={() => setComponente("modificar")}>Modificar</button>
          <button className="btn" onClick={() => setComponente("eliminar")}>Eliminar</button> 
          <button className="btn" onClick={() => setComponente("weather")}>Weather</button>
          <button className="btn" onClick={() => setComponente("usuarios")}>Usuarios</button>
        </div>
      </div>

      <div className="contenido">
        {componente === "ClienteAlta" && <Alta />}
        {componente === "Clientes" && <Listar />}
        {componente === "modificar" && <Modificar />}
        {componente === "eliminar" && <Eliminar />}
        {componente === "weather" && <Weather />}
        {componente === "usuarios" && <Usuarios />}
      </div>
    </div>
  );
}

export default Cabecera;
