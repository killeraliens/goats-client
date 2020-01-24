import React from 'react';
import PropTypes from 'prop-types';
import './Feed.css';
import FlyerCard from '../FlyerCard/FlyerCard'

export default function Feed({ flyers, events }) {

  return(
    <div className="Feed">
      {flyers.map(flyer => {
        /* eslint eqeqeq: 0 */
        const flyerEvents = events.filter(event => event.flyer_id == flyer.id)
        return <FlyerCard key={flyer.id} flyer={flyer} events={flyerEvents} />
      })}
    </div>
  )
}

Feed.defaultProps = {
  flyers: [],
  events: []
}

Feed.propTypes = {
  flyers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
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
  }))
}


