import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import CountryRegionFormGroup from './CountryRegionFormGroup'
import ValidationError from '../ValidationError/ValidationError';

export default function CountryRegionCityFormGroup({ updateCountryRegionCity }) {
  const [countryName, setCountryName] = useState('')
  const [regionName, setRegionName] = useState('')
  const [cityName, setCityName] = useState({ value: '', touched: false, error: '' })

  useEffect(() => {
    updateCountryRegionCity({
      countryName: { value: countryName },
      regionName: { value: regionName },
      cityName: cityName
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryName, regionName, cityName])

  useEffect(() => {
    const updateValidationErrors = () => {
      setCityName(prev => ({ ...prev, error: validateCityName() }))
    }
    updateValidationErrors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityName.value])

  const validateCityName = () => {
    if (cityName.touched) {
      const trimmedCityName = cityName.value.trim()
      return !(/^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/.test(trimmedCityName)) && Boolean(trimmedCityName)
      ? `City format doesn't look right`
      : trimmedCityName.length > 26
      ? 'City must be under 26 characters long'
      : ''
    }
    return ''
  }

  const updateCountryRegion = ({ countryName, regionName }) => {
    setCountryName(countryName)
    setRegionName(regionName)
  }

  return(
    <div className="fieldset-container">

      <CountryRegionFormGroup updateCountryRegion={updateCountryRegion} />

      <fieldset className="CityFieldset">
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="cityName"
          name="cityName"
          value={cityName.value || ''}
          onChange={e => setCityName({ value: e.target.value, touched: true })}
          aria-label="city name"
          aria-required="false"
          aria-describedby="cityNameError"
          aria-invalid={!!cityName.error}
        />
        <ValidationError id="cityNameError" message={cityName.error} />
      </fieldset>
    </div>
  )
}

CountryRegionCityFormGroup.defaultProps = {
  updateCountryRegionCity: () => { console.log(`country, region, city updated`) }
}

CountryRegionCityFormGroup.propTypes = {
  updateCountryRegionCity: PropTypes.func
}
