import React from 'react';
import PropTypes from 'prop-types';
import Location from '../../FlyerCard/Location';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function EventsPreview({ formEvents, deleteFormEvent }) {

  String.prototype.capitalize = function () {
    return this.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
  };

  return(
    <ul className="EventInput--preview">
      {formEvents.map((event, i) => {
        let cityName = event.cityName
          ? event.cityName.capitalize()
          : null

        let regionName = event.regionName
          ? event.regionName.capitalize()
          : null

        let countryName = event.countryName
          ? event.countryName.capitalize()
          : null

        let venueName = event.venueName
          ? event.venueName.capitalize()
          : null

        function isAllCaps(str) {
          return str === str.toUpperCase();
        }
        const regionOrCountry = () => {
          switch (true) {
            case (regionName && countryName) && isAllCaps(regionName) === true:
              return regionName;
            case (regionName && countryName) && isAllCaps(regionName) === false:
              return countryName;
            case (!regionName):
              return countryName;
            default:
              return null
          }
        }

        const regionAndCountry = () => {
          switch (true) {
            case !!regionName && !!countryName:
              return regionName + ', ' + countryName;
            case !regionName && !!countryName:
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

        const handleDelete = (e) => {
          deleteFormEvent(e.target.parentElement.id)
        }

        return (
          <li key={event.id} id={event.id}>
            <i
              className="fa fa-minus-circle delete-i"
              onClick={handleDelete}
            >
            </i>
            <span className="date-i">{event.date}</span>
            <span className="city-i">{cityName}{cityComma()}{regionAndCountry()}</span>
            <span className="venue-i">{venueName}</span>
          </li>
        )
      })}
    </ul>
  )
}

EventsPreview.defaultProps = {
  formEvents: [],
  deleteFormEvent: () => {}
}

EventsPreview.propTypes = {
  formEvents: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    date: PropTypes.string,
    venueName: PropTypes.string,
    countryName: PropTypes.string,
    regionName: PropTypes.string,
    cityName: PropTypes.string
  })),
  deleteFormEvent: PropTypes.func
}
