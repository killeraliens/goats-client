import React from 'react';
import PropTypes from 'prop-types';
import './Feed.css';
import FlyerCard from '../FlyerCard/FlyerCard'

export default function Feed({ flyers }) {
  return(
    <div className="Feed">
      {flyers.map(flyer => <FlyerCard key={flyer.id} flyer={flyer} />)}
    </div>
  )
}

Feed.defaultProps = {
  flyers: []
}

Feed.propTypes = {
  flyers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  }))
}


