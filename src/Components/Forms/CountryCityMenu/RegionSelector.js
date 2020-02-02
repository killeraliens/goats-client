import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
let provinces = require('provinces')

export default function RegionSelector({ updateRegion, formRegion, formCountry }) {
  useEffect(() => {
    const setRegionArray = () => {
      /* eslint eqeqeq: 0 */
      const regions = provinces.filter(row => row.country == formCountry.code)
      updateRegion({ value: '', array: regions } )
    }

    setRegionArray()
  }, [formCountry])

  const handleChange = (e) => {
    updateRegion({ ...formRegion, value: e.target.value })
  }

  if (!formCountry.code || formRegion.array.length === 0) {
    // if(Boolean(formRegion.value)) {
    //   return <p>{formRegion.value}</p>
    // }
    return null
  }

  return(
    <fieldset className="RegionFieldset no-grow">
      <label htmlFor="region">State/Province</label>
      <select
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
      </select>
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

