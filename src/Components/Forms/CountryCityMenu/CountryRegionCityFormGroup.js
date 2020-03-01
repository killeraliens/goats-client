import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import CountryRegionFormGroup from './CountryRegionFormGroup'
import ValidationError from '../ValidationError/ValidationError'
import Select from 'react-select'
import  config from '../../../config'

export default function CountryRegionCityFormGroup({ updateCountryRegionCity, formCountryRegionCity }) {
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(false)
  const [keyUp, setKeyUp ] = useState(false)
  const [cityValue, setCityValue] = useState(formCountryRegionCity.cityName.value)

  const fetchData = async () => {
    console.log('running fetch')
    const countryCode = `countryIds=${formCountryRegionCity.countryName.code}`
    const namePrefix = `namePrefix=${cityValue}`
    setLoading(true)
    const options = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        "X-RapidAPI-Key": `${config.X_RAPID_API_KEY}`
      },
      // signal: myAbortController.signal
    }
    try {
      const response = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/?${countryCode}&${namePrefix}`,
        options)
      const body = await response.json();
      if (!response.ok) {
        setLoading(false)
      } else {
        setLoading(false)
        console.log(body)
        setCities(body.data)
      }
    } catch (e) {
      setLoading(false)
      // if (!myAbortController.signal.aborted) {
      //   setLoading(false)
      // }
    }
  }

  useEffect(() => {
    const myAbortController = new AbortController();
    fetchData();

    return () => {
      myAbortController.abort();
    }

  }, [formCountryRegionCity.countryName.code, cityValue])

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
  }, [formCountryRegionCity.cityName.value])

  const updateCountryRegion = (countryRegionFields) => {
    updateCountryRegionCity({ ...formCountryRegionCity, ...countryRegionFields})
  }

  const cityOptions = () => {
    // return [{ value: 'Phoenix', label: 'Phoenix'},
    // { value: 'Denver', label: 'Denver'}]
    return cities.map(city => {
      return { value: city.city, label: city.city }
    })
  }

  const getOptions = (input, callback) => {
    console.log('get options', cityValue)
    let options = { options: cityOptions() } // I just used my original props
    setCityValue(input)
    // callback(null, options)
  }

  return(
    <div className="fieldset-container fieldset-container-dates-venue" >
      <CountryRegionFormGroup updateCountryRegion={updateCountryRegion} formCountryRegion={{ countryName: formCountryRegionCity.countryName, regionName: formCountryRegionCity.regionName }}/>
      <fieldset className="CityFieldset" onKeyUp={function(e){ getOptions(e.target.value)}}>
        <label htmlFor="city">City</label>
        <Select
          // options={cityOptions()}
          onChange={e => { updateCountryRegionCity({ ...formCountryRegionCity, cityName: { value: e.value, touched: true } }) }}
          asyncOptions={getOptions}
        />
        {/* <input
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
        <ValidationError id="cityNameError" message={formCountryRegionCity.cityName.error} /> */}
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
