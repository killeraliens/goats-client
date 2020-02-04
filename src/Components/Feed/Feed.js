import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import './Feed.css';
import FlyerCard from '../FlyerCard/FlyerCard';
import Spinner from '../Spinner/Spinner';
import AppContext from '../../AppContext';
// import ScrollToTop from '../ScrollToTop/ScrollToTop';

export default function Feed({ flyers, events, fetching, listing_state }) {
  const users = useContext(AppContext).users
  if (fetching) {
    return <Spinner />
  }
  return(
    <div className="Feed">
      {/* <ScrollToTop /> */}
      {flyers.map(flyer => {
        /* eslint eqeqeq: 0 */
        const flyerEvents = events.filter(event => event.flyer_id == flyer.id)
        const flyerCreator = users.find(user => user.id == flyer.creator_id)
        if (!Boolean(flyerCreator) || flyer.listing_state !== `${listing_state}`) {
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
  users: [],
  fetching: false,
  listing_state: 'Public'
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
  // users: PropTypes.arrayOf(PropTypes.shape({
  //   id: PropTypes.oneOfType([
  //     PropTypes.number,
  //     PropTypes.string
  //   ]).isRequired
  // })),
  fetching: PropTypes.bool,
  listing_state: PropTypes.oneOf([
    'Draft',
    'Private',
    'Public',
    'Flagged',
    'Banned',
    'Archived'
  ])
}


