import React from 'react';
import PropTypes from 'prop-types';
import Location from '../../FlyerCard/Location';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function EventsPreview({ events }) {
  String.prototype.capitalize = function () {
    return this.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
  };
  return(
    <ul className="EventInput--preview">
      {events.map((event, i) => {
        let cityName = event.city_name
          ? event.city_name.capitalize()
          : null

        let regionName = event.region_name
          ? event.region_name.capitalize()
          : null

        let countryName = event.country_name
          ? event.country_name.capitalize()
          : null

        let venueName = event.venue_name
          ? event.venue_name.capitalize()
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

        return (
          <li key={i}>
            <i className="fa fa-minus-circle delete-i"></i>
            <span className="date-i">{event.date}</span>
            <span className="city-i">{cityName}{cityComma()}{regionOrCountry()}</span>
            <span className="venue-i">{venueName}</span>
          </li>
        )
      })}
    </ul>
  )
}

EventsPreview.defaultProps = {
  events: []
}

EventsPreview.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    venue_name: PropTypes.string,
    country_name: PropTypes.string,
    region_name: PropTypes.string,
    city_name: PropTypes.string
  }))
}
