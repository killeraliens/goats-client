import React from 'react';
import PropTypes from 'prop-types';
import Location from '../../FlyerCard/Location';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { capitalize } from '../../../helpers/textHelpers'

export default function EventsPreview({ formEvents, deleteFormEvent }) {

  return(
    <ul className="EventInput--preview">
      {formEvents.map((event, i) => {
        let cityName = event.cityName
          ? capitalize(event.cityName)
          : null

        let regionName = event.regionName
          ? capitalize(event.regionName)
          : null

        let countryName = event.countryName
          ? capitalize(event.countryName)
          : null

        let venueName = event.venueName
          ? capitalize(event.venueName)
          : null

        function isAllCaps(str) {
          return str === str.toUpperCase();
        }

        const regionOrCountry = () => {
          switch (true) {
            // case (regionName && countryName) && isAllCaps(regionName) === true:
            case (regionName && countryName) && ['United States'].includes(countryName):
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
    date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date)
    ]),
    venueName: PropTypes.string,
    countryName: PropTypes.string,
    regionName: PropTypes.string,
    cityName: PropTypes.string
  })),
  deleteFormEvent: PropTypes.func
}
