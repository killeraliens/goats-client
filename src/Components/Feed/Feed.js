import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Feed.css';
import FlyerCard from '../FlyerCard/FlyerCard';
import Spinner from '../Spinner/Spinner';
import { HashLink as Link } from 'react-router-hash-link';
import { animateScroll } from "react-scroll";

function scrollToTop() {
  animateScroll.scrollToTop({
    containerId: "Main"
  });
}

export default function Feed({
  flyers,
  events,
  users,
  fetching,
  listing_state,
  fetchingAdditional,
  total,
  handleClickLoad
}) {

  if (fetching) {
    return <Spinner />
  }

  return(
    <div className="Feed">
      {flyers.map(flyer => {
        // console.log(flyer)
        const flyerEvents = events.filter(event => event.flyer_id === flyer.id)
        const flyerCreator = users.find(user => user.id === flyer.creator_id)
        if (!Boolean(flyerCreator) || flyer.listing_state !== `${listing_state}`) {
          return null
        }
        return <FlyerCard key={flyer.id} flyer={flyer} flyerEvents={flyerEvents} flyerCreator={flyerCreator}/>
      })}
      <div>
        {fetchingAdditional
          ? <Spinner />
            ? flyers.length = 0
            : null
          : flyers.length < total
            ? <Link to={`#`} onClick={handleClickLoad}>More....</Link>
            : <Link to={`#`} onClick={scrollToTop}>Scroll To Top</Link>
        }
      </div>
    </div>
  )
}

Feed.defaultProps = {
  flyers: [],
  events: [],
  users: [],
  fetching: false,
  listing_state: 'Public',
  fetchingAdditional: false,
  total: 0,
  handleClickLoad: () => {}

}

Feed.propTypes = {
  flyers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired,
    creator_id: PropTypes.string.isRequired,
    flyer_type: PropTypes.oneOf([
      'Show',
      'Fest',
      'Tour'
    ]).isRequired,
    listing_state: PropTypes.oneOf([
      'Draft',
      'Private',
      'Public',
      'Flagged',
      'Banned',
      'Archived'
    ]).isRequired
  })),
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    flyer_id: PropTypes.string.isRequired
  })),
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  })),
  fetching: PropTypes.bool
}


