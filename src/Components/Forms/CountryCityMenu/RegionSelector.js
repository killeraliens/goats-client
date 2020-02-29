import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select'
let provinces = require('provinces')

export default function RegionSelector({ updateRegion, formRegion, formCountry }) {
  useEffect(() => {
    const setRegionArray = () => {
      const regions = provinces.filter(row => row.country === formCountry.code)
      updateRegion({ value: '', array: regions } )
    }

    setRegionArray()
  }, [formCountry])


  const handleChange = (e) => {
    // updateRegion({ ...formRegion, value: e.target.value })
    updateRegion({ ...formRegion, value: e.label })
  }

  if (!formCountry.code || formRegion.array.length === 0 || ['BE', 'NL'].includes(formCountry.code)) {
    // if(Boolean(formRegion.value)) {
    //   return <p>{formRegion.value}</p>
    // }
    return null
  }

  const options = () => {
    return formRegion.array.map(({ name, short }) => {
      return { value: name, label: Boolean(short) ? short : name }
    })

  }

  const customStyles = {
    control: (base, state) => ({
      background: 'white',
      color: 'black',
      width: '100%',
      flexGrow: 1,
      padding: '2px',
      display: 'inline-block'
    }),
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

  return(
    <fieldset className="RegionFieldset no-grow">
      <label htmlFor="region">State/Province</label>
      <Select
        className="react-select-container"
        styles={customStyles}
        defaultValue={{ value: formRegion.value, label: formRegion.value }}
        onChange={handleChange}
        options={options()} />
      {/* <select
        id="region"
        name="region"
        type="text"
        onChange={handleChange}
        value={formRegion.value}
      >
        <option value="">--</option>
        {formRegion.array.map((region, i) => {
          return(
            <option
              key={i}
              value={!region.short ? region.name : region.short}>
              {!region.short ? region.name : region.short}
            </option>
          )
        })}
      </select> */}
    </fieldset>
  )
}

RegionSelector.defaultProps = {
  updateRegion: () => {},
  formCountry: { code: "", value: "" },
  formRegion: { array: [], value: "" }
}

RegionSelector.propTypes = {
  updateRegion: PropTypes.func,
  formRegion: PropTypes.shape({
    array: PropTypes.arrayOf(PropTypes.shape({
      short: PropTypes.string,
      name: PropTypes.string
    })),
    value: PropTypes.string
  }),
  formCountry: PropTypes.shape({
    code: PropTypes.string,
    value: PropTypes.string
  }),
}

