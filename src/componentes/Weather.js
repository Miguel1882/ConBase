import { useEffect, useState } from 'react';

function Weather() {
 const [weatherforecast, setWeatherforecast] = useState([]);

   useEffect(() => {
    fetch('https://localhost:7055/WeatherForecast')
      .then(respuesta => respuesta.json())
      .then(json => setWeatherforecast(json));
  }, []);

  return (
    <>
          {weatherforecast.length > 0 ? (
        <div>
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