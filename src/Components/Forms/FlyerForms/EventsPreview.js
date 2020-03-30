import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from '../../../helpers/textHelpers'
import { dateWithYear, dateToMMDDYYYYString } from '../../../helpers/dateHelpers'

export default function EventsPreview({ formEvents, deleteFormEvent }) {

  return(
    <ul className="EventInput--preview">
      {formEvents.map((event, i) => {

        const eventDate = event.event_date && event.event_date.length === 5
          ? dateToMMDDYYYYString(new Date(dateWithYear(event.event_date)))
          : event.event_date && event.event_date.length > 10
          ? dateToMMDDYYYYString(new Date(event.event_date))
          : event.event_date && event.event_date.length === 9
          ? '...'
          : null

        let cityName = event.city_name
          ? capitalize(event.city_name)
          : null

        let regionName = event.region_name
          ? capitalize(event.region_name)
          : null

        let countryName = event.country_name
          ? capitalize(event.country_name)
          : null

        let venueName = event.venue_name
          ? capitalize(event.venue_name)
          : null

        // function isAllCaps(str) {
        //   return str === str.toUpperCase();
        // }

        // const regionOrCountry = () => {
        //   switch (true) {
        //     // case (regionName && countryName) && isAllCaps(regionName) === true:
        //     case (regionName && countryName) && ['United States'].includes(countryName):
        //       return regionName;
        //     case (regionName && countryName) && isAllCaps(regionName) === false:
        //       return countryName;
        //     case (!regionName):
        //       return countryName;
        //     default:
        //       return null
        //   }
        // }

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
            <span className="date-i">{eventDate}</span>
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
    id: PropTypes.string.isRequired,
    flyer_id: PropTypes.string,
    event_date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date)
    ]).isRequired,
    venue_name: PropTypes.string.isRequired,
    country_name: PropTypes.string.isRequired,
    region_name: PropTypes.string.isRequired,
    city_name: PropTypes.string.isRequired,
    city_id: PropTypes.number,
    cancelled: PropTypes.bool
  })),
  deleteFormEvent: PropTypes.func
}
