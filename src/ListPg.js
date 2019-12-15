import React from 'react';
import EventCard from './EventCard';
import AppContext from './AppContext';

export default function ListPg(props) {

  return(
    <AppContext.Consumer>
      {(context) => {
        const eventCards = context.events && context.events.length > 0
                ? context.events.map((event, i) => <EventCard key={i} event={event}/> )
                : 'no events yet';
        return(
          <div className="ListPg">
            <h2>All Events</h2>
            <div className="ListPg_cards-wrap">
              { eventCards }
            </div>
          </div>
        )
      }}
    </AppContext.Consumer>
  )
}

ListPg.defaultProps = {
  events: []
}

