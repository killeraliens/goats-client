import React, { useState, useEffect } from 'react';
import CountrySelector from './CountryCityMenu/CountrySelector'

function CountryCityForm() {
  const [country, setCountry] = useState(null)
  const updateCountry = (country) => {
    setCountry(country)
  }

  return(
    <form>
      <label htmlFor="country">Select A Country</label>
      <CountrySelector updateCountry={updateCountry} />
      <p>Selected Country: {country}</p>
    </form>
  )
}

export default CountryCityForm;
