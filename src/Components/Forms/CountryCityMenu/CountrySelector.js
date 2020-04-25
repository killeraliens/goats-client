import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import config from '../../../config';
import Select from 'react-select'

export default function CountrySelector({ updateCountry, formCountry }) {
  const [data, setData] = useState({ countries: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      setLoading(true)

      try {
        const response = await fetch(`${config.API_ENDPOINT}/country`, { signal: abortController.signal })
        const body = await response.json();
        if (!response.ok) {
          //setServerError({ status: response.status, message: body.message })
          setLoading(false)
        } else {
          setLoading(false)
          setData({ countries: body })
        }
      } catch (e) {
        if (!abortController.signal.aborted) {
           //setServerError({ status: e.status, message: e.message })
          setLoading(false)
        }
      }
    }
    fetchData();
    return () => {
      // console.log('cleaned up')
      abortController.abort();
    }
  }, []);

  // after mount if formCountry val prop exists,
  // this will update the ccode and trigger the change needed for region menu appearance
  useEffect(() => {
    if (!!formCountry.value && !!formCountry.code === false) {
      const defaultCountyWithCode = data.countries.find(({ country_name }) => {
        return formCountry.value === country_name
      })
      if (defaultCountyWithCode && !!defaultCountyWithCode.country_code && !!defaultCountyWithCode.country_name) {
        updateCountry({
          code: defaultCountyWithCode.country_code,
          value: defaultCountyWithCode.country_name
        })
      }
    }
  }, formCountry.country_name, data)

  const handleChange = (e) => {
    if (e.label === 'None') {
      updateCountry({
        code: '',
        value: ''
      })
    } else {
      updateCountry({
        code: e.value,
        value: e.label
      })
    }
  }

  if (loading) {
    return <p>Loading Countries...</p>
  }

  const customStyles = {
    control: (base, state) => {
      return {
      background: 'white',
      color: 'black',
      classNamePrefix: 'react-select-container',
      padding: '1px',
      display: 'inline-block',
      border: 'solid 1px lightgrey',
      paddingLeft: state.isFocused ? '8px' : '0'
    }},
    menu: base => ({
      ...base,
      color: 'black',
      borderRadius: 0,
      hyphens: 'auto',
      marginTop: 0,
      textAlign: 'left',
      wordWrap: 'break-word'
    }),
    option: (base, state) => ({
      ...base,
      background: state.isFocused ? 'blue' : 'white',
      color: state.isFocused ? 'white' : 'black'
    }),
    dropdownIndicator: base => ({
      ...base,
      display: 'none'
    }),
    indicatorsContainer: base => ({
      ...base,
      display: 'none'
    })
  }

  const options = () => {
    const countryArr = data.countries.map(({ country_name, country_code }) => {
      return  { value: country_code, label: country_name }
    })
    return [{ value: '', label: 'None' }, ...countryArr ]
  }

  const defaultValue = () => {
    return !!formCountry.value
      ? { value: formCountry.code, label: formCountry.value }
      : { value: '', label: 'Select Country' }
  }

  return(
    <fieldset className="CountryFieldset grow">
      <label htmlFor="country">Select Country</label>
      <div className="SelectContainer">
        <Select
          className="react-select-container"
          styles={customStyles}
          defaultValue={defaultValue()}
          onChange={handleChange}
          options={options()}/>
      </div>
    </fieldset>
  )
}

CountrySelector.defaultProps = {
  updateCountry: () => {},
  formCountry: { code: '', value: '' },
}

CountrySelector.propTypes = {
  updateCountry: PropTypes.func,
  formCountry: PropTypes.shape({
    code: PropTypes.string,
    value: PropTypes.string
  }),
}

