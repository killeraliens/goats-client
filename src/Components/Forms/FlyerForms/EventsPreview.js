import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from '../../../helpers/textHelpers'
import { dateToMMDDYYYYString } from '../../../helpers/dateHelpers'

export default function EventsPreview({ formEvents, deleteFormEvent, updateFormEvent }) {

  return(
    <ul className="EventsPreview">
      {formEvents.map((event, i) => {

        const eventDate = event.event_date && event.event_date.length === 10
          ? event.event_date
          : event.event_date && event.event_date.length > 10
          ? dateToMMDDYYYYString(new Date(event.event_date))
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
          <li key={event.id} id={event.id} className={`${event.cancelled ? 'cancelled' : null}`}>
            <i
              className="fa fa-minus-circle delete-i"
              onClick={handleDelete}
            >
            </i>
            <span><i className="date-i"></i><span>{eventDate}</span></span>
            <span><i className="city-i"></i><span>{cityName}{cityComma()}{regionAndCountry()}</span></span>
            <span><i className="venue-i"></i><span>{venueName}</span></span>
            <span className="cancelled-i checkbox">
              <input
                id={event.id}
                name={event.id}
                className="checkbox"
                type="checkbox"
                checked={event.cancelled}
                onChange={e => updateFormEvent(event.id, e.target.checked)}></input>
                <label className="cancelled-i checked">
                  {event.cancelled ? 'This event will be tagged as cancelled.' : 'Cancel this event.'}
                </label>
            </span>
          </li>
        )
      })}
    </ul>
  )
}

EventsPreview.defaultProps = {
  formEvents: [],
  deleteFormEvent: () => {},
  updateFormEvent: () => {}
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
  deleteFormEvent: PropTypes.func,
  updateFormEvent: PropTypes.func
}
