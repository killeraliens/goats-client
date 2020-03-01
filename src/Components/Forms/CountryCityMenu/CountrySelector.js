import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import config from '../../../config';
import Select from 'react-select'
import { withRouter } from 'react-router-dom';

export default function CountrySelector({ updateCountry, formCountry }) {
  const [data, setData] = useState({ countries: [] })
  //const [selected, setSelected] = useState(formCountry)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const myAbortController = new AbortController();

    const fetchData = async () => {
      setLoading(true)

      try {
        const response = await fetch(`${config.API_ENDPOINT}/country`, { signal: myAbortController.signal })
        const body = await response.json();
        if (!response.ok) {
          //setServerError({ status: response.status, message: body.message })
          setLoading(false)
        } else {
          setLoading(false)
          setData({ countries: body })
        }
      } catch (e) {
        if (!myAbortController.signal.aborted) {
           //setServerError({ status: e.status, message: e.message })
          setLoading(false)
        }
      }
    }
    fetchData();

    return () => {
      // console.log('cleaned up')
      myAbortController.abort();
    }

  }, []);


  const handleChange = (e) => {
    // updateCountry({
    //   code: e.target.value,
    //   value: e.target.options[e.target.selectedIndex].text
    // })
    updateCountry({
      code: e.value,
      value: e.label
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

  // const optionDefault = () => {
  //   return  Boolean(formCountry.value)
  //     ? <option value={findCode(formCountry.value)}>{formCountry.value}</option>
  //     : <option value="">Select Country</option>
  // }

  const customStyles = {
    control: (base, state) => {
      console.log('BASE', base)
      return {
      background: 'white',
      color: 'black',
      //minWidth: 150,
      // maxWidth: '100%',
      classNamePrefix: 'react-select-container',
      padding: '2px',
      display: 'inline-block',

    }},
    // singleValue: base => {
    //   console.log('SINGLE BASE', base)
    //   return {
    //     ...base,
    //     maxWidth: "100px"
    //   }
    // },
    container: base => {
      console.log('CONTAIN BASE', base)
      return {
        ...base,
      }
    },
    menu: base => ({
      ...base,
      color: 'black',
      borderRadius: 0,
      hyphens: "auto",
      marginTop: 0,
      textAlign: "left",
      wordWrap: "break-word"
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
    return data.countries.map(({ country_name, country_code }) => {
      return  { value: country_code, label: country_name }
    })

  }

  return(
    <fieldset className="CountryFieldset grow">
      <label htmlFor="country">Select Country</label>
      <div className="SelectContainer">
        <Select
          className="react-select-container"
          styles={customStyles}
          defaultValue={{ value: formCountry.code, label: formCountry.value }}
          onChange={handleChange}
          options={options()}/>
      </div>
      {/* <select
        id="country"
        name="country"
        type="text"
        onChange={handleChange}
        value={formCountry.code || findCode(formCountry.value) || ''}
      >
        {optionDefault()}
        {data.countries.map(({ country_name, country_code }) => {
          return (
            <option key={country_code} value={country_code}>
              {country_name}
            </option>
          )
        })}
      </select> */}
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

