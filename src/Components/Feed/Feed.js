import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Feed.css';
import FlyerCard from '../FlyerCard/FlyerCard';
import Spinner from '../Spinner/Spinner';
import AppContext from '../../AppContext';
import { HashLink as Link } from 'react-router-hash-link';
import { Redirect } from 'react-router-dom'

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

  const [focusId, setFocusId] = useState('')


  // useEffect(() => {
  //   const focusLastFlyer = () => {
  //     let last = (flyers.length <= total) && (flyers.slice(-1)[0] && flyers.slice(-1)[0].id) ? flyers.slice(-1)[0].id : ''
  //     setFocusId(last)
  //     console.log(flyers)
  //     console.log('last flyer!', focusId)
  //   }
  //   const redirectToLast = () => {
  //     if (Boolean(focusId)) {
  //       const lf = document.getElementById(`${focusId}`)
  //       if(Boolean(lf)) {
  //         window.location.hash = focusId
  //         lf.scrollIntoView()
  //       } else {
  //         window.location.hash = ''
  //         setFocusId(`MainHeader`)
  //         document.getElementById(`MainHeader`).scrollIntoView()
  //       }
  //     }
  //   }
  //   focusLastFlyer()
  //   redirectToLast()
  // }, [handleClickLoad])


  const resetHash = () => {
    window.location.hash = 'MainHeader'
    setFocusId('MainHeader')
  }

  if (fetching) {
    return <Spinner />
  }

  return(
    <div className="Feed">
      {flyers.map(flyer => {
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
            : <Link to={`#MainHeader`} onClick={resetHash}>Scroll To Top</Link>
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
  listing_state: 'Public'
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


