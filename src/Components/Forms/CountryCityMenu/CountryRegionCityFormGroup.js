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
  }, [countryName, regionName, cityName])

  useEffect(() => {
    const updateValidationErrors = () => {
      setCityName(prev => ({ ...prev, error: validateCityName() }))
    }
    updateValidationErrors()
  }, [cityName.value])

  const validateCityName = () => {
    if (cityName.touched) {
      const trimmedCityName = cityName.value.trim()
      return trimmedCityName.length > 26
          ? 'city must be under 26 characters long'
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
      <div className="fieldset-container sub-group">
        <CountryRegionFormGroup updateCountryRegion={updateCountryRegion} />
      </div>
      <fieldset className="grow">
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
