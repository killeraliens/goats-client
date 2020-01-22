import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../../../config'
let provinces = require('provinces')

function RegionSelector(props) {
  const [regions, setRegions] = useState([])
  // const [loading, setLoading] = useState(true)
  useEffect(() => {
    const updateRegions = () => {
      const regions = provinces.filter(row => row.country == props.countryCode)
      setRegions(regions)
      // setLoading(false)
    }
    updateRegions()
  }, [props.countryCode])

  // if (loading) {
  //   return <p>Finding Regions...</p>
  // }
  if (!props.countryCode) {
    return null
  }

  return(
    <fieldset className="grow">
      <label htmlFor="region">State/Province</label>
      <select id="region" name="region" type="text">
        <option value="None">--</option>
        {regions.map(region => {
          return <option
            key={region.name}
            value={!region.short ? region.name : region.short}>
              {!region.short ? region.name : region.short}
            </option>
        })}
      </select>
    </fieldset>
  )
}

RegionSelector.defaultProps = {
  countryCode: '--'
}

RegionSelector.propTypes = {
  countryCode: PropTypes.string
}

export default RegionSelector;
