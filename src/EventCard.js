import React from 'react';

function EventCard(props) {
  return(
    <div>
      <h4>{props.event.event_name}</h4>
      <span>{props.event.event_dates}</span>
      <p>{props.event.description}</p>
    </div>
  )
}

EventCard.defaultProps = {
  event: {
    event_name: 'title NA',
    event_dates: 'dates NA',
    description: 'description NA'
    // imageUrl: 'imageUrl NA',
    // date: 'date NA',
    // bands: 'band NA',
    // venueId: 'venueId NA' //how should i set this? event card is temp event db
  }
}

export default EventCard;
