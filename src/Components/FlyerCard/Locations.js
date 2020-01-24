import React from 'react';
import Location from './Location';

export default function Locations({ flyerEvents }) {
  let eventLocations = flyerEvents.map(event => {
    let eventLocation = {}
    for (const [key, val] of Object.entries(event)) {
      if (["city_name", "region_name", "country_name", "venue_name"].includes(key) && Boolean(val)) {
        eventLocation[key] = val
      }
    }
    return eventLocation
  })

  return (
    <div className="Flyer--locations">
      {eventLocations.map((location, i) => {
        return <Location key={i} eventLocation={location} />
      })}

    </div>
  )
}
