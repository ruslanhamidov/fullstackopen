import axios from 'axios'
import { useState, useEffect } from "react";

const App = () => {
  const [countries, setCountries] = useState([])
  // const [singleCountry, setCountry] = useState()
  const [newSearch, setNewSearch] = useState("");
  const [isEmpty, showCountries] = useState(true);

  const getCountries = () => {
    axios.
      get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setCountries(response.data)
      })
  }

  useEffect(getCountries, [])

  const onChangeSearch = (event) => {
    const val = event.target.value;
    val ? showCountries(false) : showCountries(true);
    setNewSearch(val);
  }

  const countryToShow = isEmpty ? [] :
    countries.filter((country) => country.name.common.toLowerCase().includes(newSearch));


  const contriesQuery = () => {
    if (countryToShow.length > 10) {
      return (
        <p>Too many matches, specify another filter</p>
      )
    }

    if (countryToShow.length === 1) {
      return renderCountry()
    }
    return (
      <div>
        {countryToShow.map(
        (country) => (
          <li key={country.cca2}>{country.name.common}</li>
        )
      )}
      </div>
    )
  }

  const renderCountry = () => {
    const country = countryToShow[0]
    console.log(country.languages)
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
      </div>
    )
  }

  return (
    <div>
      <h1>Rest Countries</h1>
      find countries<input value={newSearch} onChange={onChangeSearch}></input>
      {contriesQuery()}
    </div>
  )
}

export default App
