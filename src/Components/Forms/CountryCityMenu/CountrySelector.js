import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../../../config'

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
    props.updateCountryCode(e.target.value)
  }

  if (loading) {
    return <p>Loading Countries...</p>
  }
  return(
    <fieldset className="grow">
      <label htmlFor="country">Select A Country</label>
      <select id="country" name="country" type="text" onChange={handleChange}>
        <option value="None">Select Country</option>
        {data.countries.map(({ country_name, country_code }) => {
          return <option key={country_code} value={country_code}>{country_name}</option>
        })}
      </select>
    </fieldset>
  )
}

CountrySelector.defaultProps = {
  countries: []
}

CountrySelector.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.shape({
    country_name: PropTypes.string,
    country_code: PropTypes.string
  }))
}


export default CountrySelector;
