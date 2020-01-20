import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import config from '../config'

function CountrySelector(props) {
  const [data, setData] = useState({ countries: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const result = await axios(`${config.API_ENDPOINT}/api/country`)
      setLoading(false)
      setData({ countries: result.data })
    }

    fetchData();
  }, []);

  const handleChange = (e) => {
    props.updateCountry(e.target.value)
  }

  if (isLoading) {
    return <p>Loading Countries...</p>
  }
  return(
      <select name="countries" onChange={handleChange}>
        <option value="None">Select Country</option>
        {data.countries.map(({ country_name, country_code }) => {
          return <option key={country_code} value={country_code}>{country_name}</option>
        })}
      </select>

  )
}

CountrySelector.defaultProps = {
  countries: []
}


export default CountrySelector;
