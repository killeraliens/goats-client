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
  updateCountryRegion: () => { console.log(`country or region updated`) },
  formCountryRegion: {
    countryName: { value: '', code: '' },
    regionName: { value: '', array: [] },
  }
}

CountryRegionFormGroup.propTypes = {
  updateCountryRegion: PropTypes.func,
  formCountryRegion: PropTypes.shape({
    countryName: PropTypes.shape({
      code: PropTypes.string,
      value: PropTypes.string
    }),
    regionName: PropTypes.shape({
      array: PropTypes.array,
      value: PropTypes.string
    }),
  })
}

