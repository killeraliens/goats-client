import React, { useState, useEffect } from 'react';
import CountrySelector from './CountrySelector';
import RegionSelector from './RegionSelector';
import PropTypes from 'prop-types';

export default function CountryRegionFormGroup(props) {
  const [country, setCountry] = useState({code: '', name: ''})
  const [regionName, setRegionName] = useState(null)

  const updateCountry = (country) => {
    setCountry(country)
  }

  const updateRegionName = (name) => {
    setRegionName(name)
  }

  useEffect(() => {
     console.log(country)
    // console.log(`${countryCode}, ${regionName}`)
    props.updateCountryRegion({
      countryName: country.name,
      regionName: regionName
    })
  })

  return(
    <div className="fieldset-container sub-group">
      <CountrySelector updateCountryCode={updateCountry} />
      <RegionSelector countryCode={country.code} updateRegionName={updateRegionName} />
    </div>
  )
}

CountryRegionFormGroup.defaultProps = {
  updateCountryRegion: () => { console.log(`country or region updated`) }
}

CountryRegionFormGroup.propTypes = {
  updateCountryRegion: PropTypes.func
}
