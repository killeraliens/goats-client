import React from 'react';
import PropTypes from 'prop-types';
import './Feed.css';
import FlyerCard from '../FlyerCard/FlyerCard'

export default function Feed({ flyers, events, users }) {
  // MENTOR QUESTION: why is this rerendering multipletimes causing empty data to be sent before loading is complete
  // seems to be rerending as the 3 props load from Forum parent (rerenders 3 times)
  return(
    <div className="Feed">
      {console.log(flyers)}
      {flyers.map(flyer => {
        /* eslint eqeqeq: 0 */
        const flyerEvents = events.filter(event => event.flyer_id == flyer.id)
        const flyerCreator = users.find(user => user.id == flyer.creator_id)
        console.log(`${flyer.headline}`, flyerCreator)
        if (!Boolean(flyerCreator)) {
          return null
        }
        return <FlyerCard key={flyer.id} flyer={flyer} flyerEvents={flyerEvents} flyerCreator={flyerCreator}/>
      })}
    </div>
  )
}

Feed.defaultProps = {
  flyers: [],
  events: [],
  users: []
}

Feed.propTypes = {
  flyers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired,
    creator_id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired
  })),
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired,
    flyer_id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired
  })),
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired
  }))
}


