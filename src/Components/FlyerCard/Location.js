import React from 'react';
import PropTypes from 'prop-types';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DateOf from './DateOf';

export default function Location({ eventLocation, isTourAbbrev, hasTourEventDate }) {
  String.prototype.capitalize = function () {
    return this.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
  };

  let cityName = eventLocation.city_name
    ? eventLocation.city_name.capitalize()
    : null

  let regionName = eventLocation.region_name
    ? eventLocation.region_name.capitalize()
    : null

  let countryName = eventLocation.country_name
    ? eventLocation.country_name.capitalize()
    : null

  let venueName = eventLocation.venue_name
    ? eventLocation.venue_name.capitalize()
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
        <DateOf date={ eventLocation.date }/>
        {cityName}{cityComma()}{regionOrCountry()}{venueDash()}{venueName}
      </p>
    )
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
  tourEventDate: false
}

Location.propTypes = {
  eventLocation: PropTypes.shape({
    city_name: PropTypes.string,
    region_name: PropTypes.string,
    country_name: PropTypes.string,
    venue_name: PropTypes.string
  }),
  isTourAbbrev: PropTypes.bool,
  hasTourEventDate: PropTypes.bool
}
