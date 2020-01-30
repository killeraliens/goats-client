import React, { useState, useEffect } from 'react';
import CountrySelector from './CountrySelector';
import RegionSelector from './RegionSelector';
import PropTypes from 'prop-types';

export default function CountryRegionFormGroup({ updateCountryRegion, formCountryRegion }) {

  const updateCountry = (country) => {
    updateCountryRegion({...formCountryRegion, countryName: {...country}})
  }

  const updateRegion = (region) => {
    updateCountryRegion({ ...formCountryRegion, regionName: { ...region }})
  }

  return(
    <div className="fieldset-container sub-group">
      <CountrySelector updateCountry={updateCountry} formCountry={formCountryRegion.countryName}/>
      <RegionSelector updateRegion={updateRegion} formRegion={formCountryRegion.regionName} formCountry={formCountryRegion.countryName}/>
    </div>
  )
}

CountryRegionFormGroup.defaultProps = {
  updateCountryRegion: () => { console.log(`country or region updated`) }
}

CountryRegionFormGroup.propTypes = {
  updateCountryRegion: PropTypes.func
}
