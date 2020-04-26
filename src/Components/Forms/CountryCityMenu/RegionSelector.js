import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select'
let provinces = require('provinces')

export default function RegionSelector({ updateRegion, formRegion, formCountry }) {
  const formRegionDefault = !!formRegion.value
    ? { value: formRegion.value, label: formRegion.value }
    : { value: '', label: 'Select Region' }

  useEffect(() => {
    const setRegionArray = () => {
      const regions = provinces.filter(row => row.country === formCountry.code)
      updateRegion({ value: regions.length > 0 ? formRegion.value : '', array: regions })
    }
    setRegionArray()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formCountry.code, formRegion.value])

  const handleChange = (e) => {
    updateRegion({ ...formRegion, value: e.value })
  }

  const options = () => {
    const regions = formRegion.array.map(({ name, short }) => {
      return { value: Boolean(short) ? short : name, label: Boolean(short) ? short : name }
    })
    return [{ value: '', label: 'None' }, ...regions]
  }

  const customStyles = {
    control: (base, state) => ({
      background: 'white',
      color: 'black',
      padding: '1px',
      display: 'inline-block',
      border: 'solid 1px lightgrey',
      paddingLeft: state.isFocused ? '8px' : '0'
    }),
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

  if (!!formCountry.code === false || formRegion.array.length === 0 || !['US', 'CA'].includes(formCountry.code)) {
    return null
  }

  return(
    <fieldset className="RegionFieldset no-grow">
      <label htmlFor="region">State/Province</label>
      <Select
        styles={customStyles}
        defaultValue={formRegionDefault}
        onChange={handleChange}
        options={options()} />
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

