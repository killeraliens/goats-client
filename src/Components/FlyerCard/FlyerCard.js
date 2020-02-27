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
import { createMarkup, returnCleanContentEditable, returnSanitizedHtml } from '../../helpers/textHelpers'

export default function FlyerCard({ flyer }) {
  const flyerEvents = flyer.events || []
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
          (returnCleanContentEditable(flyer.bands).length > 0) || (returnCleanContentEditable(flyer.details).length > 0)
           ? (
              <Accordian triggerNode={<div className="margin-bottom-16">...Details</div>}>
                {returnCleanContentEditable(flyer.bands).length > 0 ? <p className="html-display-p" dangerouslySetInnerHTML={createMarkup(`<p>${returnSanitizedHtml(flyer.bands)}</p>`)}/> : null}
                {returnCleanContentEditable(flyer.details).length > 0 ? <p className="html-display-p" dangerouslySetInnerHTML={createMarkup(`${returnSanitizedHtml(flyer.details)}`)}/> : null}
                {/* <p>{flyer.bands}</p> */}
                {/* <p>{flyer.details}</p> */}
              </Accordian>
           )
           : null
       }
      </div>
      <Comments flyer={flyer} />

    </div>
  )
}

FlyerCard.defaultProps = {
  flyer: {
    bands: '',
    details: '',
    publish_comment: '',
    creator_image_url: '',
    events: []
  },
}

FlyerCard.propTypes = {
  flyer: PropTypes.shape({
    id:  PropTypes.string.isRequired,
    creator_id: PropTypes.string.isRequired,
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
    ]).isRequired,
    creator_username: PropTypes.string.isRequired,
    creator_image_url: PropTypes.string,
    events: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      flyer_id: PropTypes.string,
      event_date: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date)
      ]),
      venue_name: PropTypes.string,
      country_name: PropTypes.string,
      region_name: PropTypes.string,
      city_name: PropTypes.string,
      city_id: PropTypes.number
    }))
  }).isRequired,
}
