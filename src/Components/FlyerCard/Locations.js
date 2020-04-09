import React from 'react';
import PropTypes from 'prop-types';
import Location from './Location';

export default function Locations({ flyerEvents, isFullTourListing, isTourAbbrev }) {
  let eventLocations = flyerEvents.map(event => {
    let eventLocation = {}
    if (isFullTourListing) {
      for (const [key, val] of Object.entries(event)) {
        if (["event_date", "city_name", "region_name", "country_name", "venue_name", "cancelled"].includes(key) && Boolean(val)) {
          eventLocation[key] = val
        }
      }
    } else {
      for (const [key, val] of Object.entries(event)) {
        if (["city_name", "region_name", "country_name", "venue_name", "cancelled"].includes(key) && Boolean(val)) {
          eventLocation[key] = val
        }
      }
    }

    return eventLocation
  })

  switch (true) {
    case isFullTourListing:
      return (
        <div className="Flyer--locations">
          {eventLocations.map((location, i) => {
            if (location.event_date) {
              return <Location
                key={i}
                eventLocation={location}
                hasTourEventDate={true}
                isCancelled={location.cancelled ? true : false}/>
            }
            return <Location key={i} eventLocation={location} />
          })}
        </div>
      );
    case isTourAbbrev:
      return (
        <div className="Flyer--locations">
          <Location isTourAbbrev={true} />
        </div>
      );
    case eventLocations.length > 0 && !isTourAbbrev:
      return (
        <div className="Flyer--locations">
          <Location eventLocation={eventLocations[0]}/>
        </div>
      );
    default:
      return null;
  }

}

Locations.defaultProps = {
  flyerEvents: [],
  isFullTourListing: false,
  isTourAbbrev: false
}

Locations.propTypes = {
  flyerEvents: PropTypes.arrayOf(PropTypes.shape({
    id:  PropTypes.string,
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
  })),
  isFullTourListing: PropTypes.bool,
  isTourAbbrev: PropTypes.bool
}

