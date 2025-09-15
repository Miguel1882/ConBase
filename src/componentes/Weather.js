import { useEffect, useState } from 'react';
import "../componentes/Weather.css";

function Weather() {
 const [weatherforecast, setWeatherforecast] = useState([]);

   useEffect(() => {
    fetch('https://localhost:53009/WeatherForecast')
      .then(respuesta => respuesta.json())
      .then(json => setWeatherforecast(json));
  }, []);

  return (
    <>
          {weatherforecast.length > 0 ? (
        <div className="weather-container">
          <h2>Pronóstico del Tiempo</h2>
          <ul>
            {weatherforecast.map((wf) => (
              <li key={wf.date}>
                {`${wf.date} - ${wf.summary} (${wf.temperatureC}°C)`}
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

export default Weather