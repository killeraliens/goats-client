import React from 'react';
import PropTypes from 'prop-types';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DateOf from './DateOf';
import { capitalize } from '../../helpers/textHelpers'

export default function Location({ eventLocation, isTourAbbrev, hasTourEventDate, allCountryFields }) {

  let cityName = eventLocation.city_name
    ? capitalize(eventLocation.city_name)
    : null

  let regionName = eventLocation.region_name
    ? capitalize(eventLocation.region_name)
    : null

  let countryName = eventLocation.country_name
    ? capitalize(eventLocation.country_name)
    : null

  let venueName = eventLocation.venue_name
    ? capitalize(eventLocation.venue_name)
    : null

  function isUpperCase(str) {
    return str === str.toUpperCase();
  }
  const regionOrCountry = () => {
    switch (true) {
      case (regionName && countryName) && isUpperCase(regionName) === true:
        return regionName;
      case (regionName && countryName) && isUpperCase(regionName) === false:
        return countryName;
      case (!regionName):
        return countryName;
      default:
        return null
    }
  }

  const cityComma = () => {
    switch (true) {
      case Boolean(cityName) && (Boolean(countryName) || Boolean(regionName)):
        return ', ';
      default:
        return null
    }
  }

  const venueDash = () => {
    switch (true) {
      case Boolean(venueName) && (Boolean(cityName) || Boolean(countryName) || Boolean(regionName)):
        return ' - ';
      default:
        return null
    }
  }

  if(isTourAbbrev) {
    return (
      <p className="Flyer--location">
        <FontAwesomeIcon icon={faMapMarker} />
        Multiple
      </p>
    )
  }
  if(hasTourEventDate) {
    return (
      <p className="Flyer--location">
        <FontAwesomeIcon icon={faMapMarker} />
        <DateOf date={ eventLocation.event_date }/>
        {cityName}{cityComma()}{regionOrCountry()}{venueDash()}{venueName}
      </p>
    )
  }
  if (allCountryFields) {
    if( !!cityName || !!countryName || !!regionName) {
      return (
        <p className="Profile--location">
          <FontAwesomeIcon icon={faMapMarker} />
          {' '}{cityName}{cityComma()}{regionName}{' '}{countryName}
        </p>
      )
    } else {
      return null
    }
  }
  return (
    <p className="Flyer--location">
      <FontAwesomeIcon icon={faMapMarker} />
      {cityName}{cityComma()}{regionOrCountry()}{venueDash()}{venueName}
    </p>
  )
}

Location.defaultProps = {
  eventLocation: {},
  isTourAbbrev: false,
  tourEventDate: false,
  allCountryFields: false
}

Location.propTypes = {
  eventLocation: PropTypes.shape({
    id: PropTypes.string,
    flyer_id: PropTypes.string,
    event_date: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string
    ]),
    city_name: PropTypes.string,
    region_name: PropTypes.string,
    country_name: PropTypes.string,
    venue_name: PropTypes.string,
    city_id: PropTypes.number,
    cancelled: PropTypes.bool
  }),
  isTourAbbrev: PropTypes.bool,
  hasTourEventDate: PropTypes.bool,
  allCountryFields: PropTypes.bool
}
