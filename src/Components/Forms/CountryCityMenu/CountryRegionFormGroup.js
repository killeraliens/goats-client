import React, { useState, useEffect } from 'react';
import CountrySelector from './CountrySelector';
import RegionSelector from './RegionSelector'

function CountryRegionFormGroup() {
  const [countryCode, setCountryCode] = useState(null)
  const updateCountryCode = (country_code) => {
    setCountryCode(country_code)
  }

  return(
    <div className="fieldset-container sub-group">
      <CountrySelector updateCountryCode={updateCountryCode}/>
      <RegionSelector countryCode={countryCode} />
    </div>
  )
}

export default CountryRegionFormGroup;
