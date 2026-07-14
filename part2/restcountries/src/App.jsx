import axios from 'axios'
import { useState, useEffect } from "react";
import Country from "./components/Country"

const App = () => {
  const [countries, setCountries] = useState([])
  const [showCountry, setShow] = useState(false)
  const [singleCountry, setSingleCountry] = useState({})
  const [newSearch, setNewSearch] = useState("");
  const [isEmpty, showCountries] = useState(true);


  const show = (country) => {
    setShow(!showCountry)
    setSingleCountry(country)
  }

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
      return <Country country={countryToShow[0]} />
    }

    return (
      <div>
        {countryToShow.map(
        (country) => (
            <li key={country.cca2}>
              {country.name.common}
              <button onClick={() => show(country)}>show</button>
            </li>
        )
        )}
      </div>
    )
  }

  return (
    <div>
      <h1>Rest Countries</h1>
      find countries<input value={newSearch} onChange={onChangeSearch}></input>
      {contriesQuery()}
      {showCountry && <Country country={singleCountry} />}
    </div>
  )
}

export default App
