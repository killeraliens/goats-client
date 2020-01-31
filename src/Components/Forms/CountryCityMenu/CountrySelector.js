import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../../../config';

export default function CountrySelector({ updateCountry, formCountry }) {
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
    updateCountry({
      code: e.target.value,
      value: e.target.options[e.target.selectedIndex].text
    })
  }

  if (loading) {
    return <p>Loading Countries...</p>
  }

  const findCode = (formCountryVal) => {
    const country = data.countries.find(({ country_name, country_code }) => {
      return country_name === formCountryVal
    })
    if (country && country.country_code) {
      return country.country_code
    }
  }

  const optionDefault = () => {
    return  Boolean(formCountry.value)
      ? <option value={findCode(formCountry.value)}>{formCountry.value}</option>
      : <option value="">Select Country</option>
  }

  return(
    <fieldset className="CountryFieldset grow">
      <label htmlFor="country">Select Country</label>
      <select
        id="country"
        name="country"
        type="text"
        onChange={handleChange}
        value={formCountry.code || findCode(formCountry.value) || ''}
      >
        {optionDefault()}
        {data.countries.map(({ country_name, country_code }) => {
          return <option key={country_code} value={country_code}>{country_name}</option>
        })}
      </select>
    </fieldset>
  )
}

CountrySelector.defaultProps = {
  updateCountry: () => {},
  formCountry: { code: "", value: "" },
}

CountrySelector.propTypes = {
  updateCountry: PropTypes.func,
  formCountry: PropTypes.shape({
    code: PropTypes.string,
    value: PropTypes.string
  }),
}

