import React from 'react';
import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import ThroughDates from './ThroughDates';
import Locations from './Locations';
import Accordian from '../Accordian/Accordian';
import Location from './Location';
import Comments from '../Comments/Comments';
import FlyerCardMenu from '../FlyerCardMenu/FlyerCardMenu'
import './FlyerCard.css';



export default function FlyerCard({ flyer, flyerEvents, flyerCreator }) {
  return (
    <div className="FlyerCard Card" id={`${flyer.id}`}>
      {/* <FlyerCardMenu flyerId={flyer.id} creatorId={flyer.creator_id} /> */}
      <img className="Flyer--image"
        src={flyer.image_url}
        alt={flyer.headline}
      />
      <div className="Card--body">
        <FlyerCardMenu flyerId={flyer.id} creatorId={flyer.creator_id} />
        <div className="Card--header">
          <div className="Flyer--icon-type Tag">{flyer.flyer_type}</div>
          <h2>{flyer.headline}</h2>
        </div>
        <ThroughDates flyerEvents={flyerEvents} />
        {flyer.flyer_type === "Tour" && flyerEvents.length > 1
          ? (
            <Accordian triggerNode={<Location isTourAbbrev={true} />}>
              <Locations flyerEvents={flyerEvents} isFullTourListing={true} />
            </Accordian>
          )
          : flyerEvents.length > 0
          ? <Locations flyerEvents={flyerEvents} />
          : null
        }
       {
         Boolean(flyer.bands) || Boolean(flyer.details)
           ? (
              <Accordian triggerNode={<p>...Details</p>}>
                <p>{flyer.bands}</p>
                <p>{flyer.details}</p>
              </Accordian>
           )
           : null
       }
      </div>
      <Comments flyer={flyer} flyerCreator={flyerCreator}/>

    </div>
  )
}

FlyerCard.defaultProps = {
}

FlyerCard.propTypes = {
  flyer: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired,
    creator_id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired,
    flyer_type: PropTypes.oneOf([
      "Fest",
      "Tour",
      "Show"
    ]).isRequired,
    image_url: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    created: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date)
    ]).isRequired,
    modified: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date)
    ]).isRequired,
    bands: PropTypes.string,
    details: PropTypes.string,
    publish_comment: PropTypes.string,
    listing_state: PropTypes.oneOf([
      'Draft',
      'Private',
      'Public',
      'Flagged',
      'Banned',
      'Archived'
    ]).isRequired
  }).isRequired,
  flyerEvents: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date)
    ]),
    venueName: PropTypes.string,
    countryName: PropTypes.string,
    regionName: PropTypes.string,
    cityName: PropTypes.string
  })).isRequired,
  flyerCreator: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    image_url: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  }).isRequired
}
