import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
let provinces = require('provinces')

export default function RegionSelector({ countryCode, updateRegionName }) {
  const [regions, setRegions] = useState([])
  const [regionName, setRegionName] = useState('')

  useEffect(() => {
    const updateRegions = () => {
      /* eslint eqeqeq: 0 */
      const regions = provinces.filter(row => row.country == countryCode)
      setRegions(regions)
    }
    const clearField = () => {
      setRegionName('')
    }
    clearField()
    updateRegions()
  }, [countryCode])

  useEffect(() => {
    updateRegionName(regionName)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionName])

  const handleChange = (e) => {
    setRegionName(e.target.value)
  }

  if (!countryCode || regions.length === 0) {
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
        value={regionName}
      >
        <option value="">--</option>
        {regions.map((region, i) => {
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
  countryCode: null,
  updateRegionName: () => { console.log('default updateRegionName function')}
}

RegionSelector.propTypes = {
  countryCode: PropTypes.string,
  updateRegionName: PropTypes.func
}

