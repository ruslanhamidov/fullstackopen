import { useState, useEffect } from "react"
import axios from 'axios'

const Country = ({ country }) => {
    const api_key = import.meta.env.VITE_API_KEY
    const baseUrl = 'http://api.openweathermap.org/data/2.5/weather'
    const [countryWeather, setWeather] = useState({})

    const requestUrl = baseUrl.concat(`?q=${country.capital}&units=metric&appid=${api_key}`)

    useEffect(() => {
      axios.get(requestUrl).then((response) => setWeather(response.data))
    }, [requestUrl])


  if (!countryWeather.main) {
    return <p>Loading weather...</p>
  }
  const icon = countryWeather.weather[0].icon
  const pngUrl = `https://rodrigokamada.github.io/openweathermap/images/${icon}_t.png`

  return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <h1>Languages</h1>
        <ul>
        {Object.values(country.languages).map((language) => (
          <li>{language}</li>
        ))}
        </ul>
        <img src={country.flags.png}></img>
        <h1>Weather in {country.name.common}</h1>
        <p>Wind {countryWeather.wind.speed} m/s</p>
        <img src={pngUrl}></img>
        <p>Temperature {countryWeather.main.temp} Celsius</p>
      </div>
    )
  }

export default Country
