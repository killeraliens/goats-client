import React from 'react';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Location({ eventLocation }) {
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
  return (
    <p className="Flyer--location">
      <FontAwesomeIcon icon={faMapMarker} />
      {cityName}{cityComma()}{regionOrCountry()}{venueDash()}{venueName}
    </p>
  )
}
