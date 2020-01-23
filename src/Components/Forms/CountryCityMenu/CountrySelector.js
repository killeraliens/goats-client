import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../../../config';

export default function CountrySelector(props) {
  const [data, setData] = useState({ countries: [] })
  const [selectedCountry, setSelectedCountry] = useState({ code: '', name: ''})
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

  useEffect(() => {
    props.updateCountryCode(selectedCountry)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry, props.updateCountryCode])

  const handleChange = (e) => {
    setSelectedCountry({
      code: e.target.value,
      name: e.target.options[e.target.selectedIndex].text
    })
    // console.log(e.target.options[e.target.selectedIndex].text)
  }

  if (loading) {
    return <p>Loading Countries...</p>
  }
  return(
    <fieldset className="grow">
      <label htmlFor="country">Select A Country</label>
      <select
        id="country"
        name="country"
        type="text"
        onChange={handleChange}
        value={selectedCountry.code}
      >
        <option value="">Select Country</option>
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

