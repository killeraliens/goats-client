 /* eslint eqeqeq: 0 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
let provinces = require('provinces')

export default function RegionSelector(props) {
  const [regions, setRegions] = useState([])
  const [regionName, setRegionName] = useState('')

  useEffect(() => {
    // console.log('props country code changed', props.countryCode)
    const updateRegions = () => {
      const regions = provinces.filter(row => row.country == props.countryCode)
      setRegions(regions)
    }
    const clearField = () => {
      setRegionName('')
    }
    clearField()
    updateRegions()
  }, [props.countryCode])

  useEffect(() => {
    props.updateRegionName(regionName)
  }, [regionName])

  const handleChange = (e) => {
    setRegionName(e.target.value)
  }

  if (!props.countryCode || regions.length === 0) {
    return null
  }

  return(
    <fieldset className="no-grow">
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
  country: { code: '', name: '' }
}

RegionSelector.propTypes = {
  country: PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string
  }),
  updateRegionName: PropTypes.func
}

