import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import CountryRegionFormGroup from './CountryRegionFormGroup'
import ValidationError from '../ValidationError/ValidationError'

export default function CountryRegionCityFormGroup({ updateCountryRegionCity, formCountryRegionCity }) {


  const validateCityName = () => {
    if (formCountryRegionCity.cityName.touched) {
      const trimmedCityName = formCountryRegionCity.cityName.value.trim()
      return !(/^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/.test(trimmedCityName)) && Boolean(trimmedCityName)
        ? `City format doesn't look right`
        : trimmedCityName.length > 26
          ? 'City must be under 26 characters long'
          : ''
    }
    return ''
  }

  useEffect(() => {
    const updateValidationErrors = () => {
      updateCountryRegionCity({ ...formCountryRegionCity, cityName: { ...formCountryRegionCity.cityName, error: validateCityName() } })
    }
    updateValidationErrors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateCountryRegion = (countryRegionFields) => {
    updateCountryRegionCity({ ...formCountryRegionCity, ...countryRegionFields})
  }

  return(
    <div className="fieldset-container fieldset-container-dates-venue" >
      <CountryRegionFormGroup updateCountryRegion={updateCountryRegion} formCountryRegion={{ countryName: formCountryRegionCity.countryName, regionName: formCountryRegionCity.regionName }}/>
      <fieldset className="CityFieldset">
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="cityName"
          name="cityName"
          value={formCountryRegionCity.cityName.value || ''}
          onChange={e => { updateCountryRegionCity({ ...formCountryRegionCity, cityName: { value: e.target.value, touched: true } })}}
          aria-label="city name"
          aria-required="false"
          aria-describedby="cityNameError"
          aria-invalid={!!formCountryRegionCity.cityName.error}
          autoComplete="off"
        />
        <ValidationError id="cityNameError" message={formCountryRegionCity.cityName.error} />
      </fieldset>
    </div>
  )
}

CountryRegionCityFormGroup.defaultProps = {
  updateCountryRegionCity: () => { },
  formCountryRegionCity: {
    countryName: { value: '', code: '' },
    regionName: { value: '', array: [] },
    cityName: { value: '', touched: false, error: '' }
  }
}

CountryRegionCityFormGroup.propTypes = {
  updateCountryRegionCity: PropTypes.func,
  formCountryRegionCity: PropTypes.shape({
    countryName: PropTypes.shape({
      value: PropTypes.string,
      code: PropTypes.string
    }),
    regionName: PropTypes.shape({
      value: PropTypes.string,
      array: PropTypes.array
    }),
    cityName: PropTypes.shape({
      value: PropTypes.string,
      touched: PropTypes.bool,
      error: PropTypes.string
    })
  })
}
