import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ThroughDates from './ThroughDates';
import Locations from './Locations';
import Accordian from '../Accordian/Accordian';
import Location from './Location';
import Comments from '../Comments/Comments';
import FlyerCardMenu from '../FlyerCardMenu/FlyerCardMenu';
import './FlyerCard.css';
import { createMarkup, returnCleanContentEditable, returnSanitizedHtml } from '../../helpers/textHelpers'

export default function FlyerCard({ flyer, isEdit }) {
  const flyerEvents = flyer.events && flyer.events.length > 0
    ? flyer.events
    : []

  const pastCount = flyerEvents.filter(event => event.event_date && new Date(event.event_date) < new Date(Date.now())).length
  const isPast = pastCount === flyerEvents.length && pastCount > 0
      ? true
      : false

  const cancelledCount = flyerEvents.filter(event => event.cancelled).length
  const isCancelled = cancelledCount === flyerEvents.length && cancelledCount > 0
    ? true
    : false

  const isPartCancelled = cancelledCount < flyerEvents.length && cancelledCount > 0
    ? true
    : false

  return (
    <div className={`FlyerCard Card ${isCancelled ? 'cancelled' : null}`} id={`${flyer.id}`}>
      {/* <FlyerCardMenu flyerId={flyer.id} creatorId={flyer.creator_id} /> */}
      <Link to={`/flier/${flyer.id}`}>
        <img className="Flyer--image"
          src={flyer.image_url}
          alt={flyer.headline}
        />
      </Link>
      <div className="Card--body">
        <FlyerCardMenu flyerId={flyer.id} creatorId={flyer.creator_id} hasHandle={isEdit ? false : true }/>
        <div className="Card--header">
          {
            isCancelled
              ? <div className="Flyer--icon-type Tag cancelled">Cancelled</div>
              : null
          }
          {isPast
            ? <div className="Flyer--icon-type Tag past">Past {flyer.flyer_type}</div>
            : <div className="Flyer--icon-type Tag">{flyer.flyer_type}</div>
          }
          {
            isPartCancelled
                ? <div className="Flyer--icon-type Tag cancelled">Updates</div>
                : null
          }
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
  isEdit: false
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
      city_id: PropTypes.number,
      cancelled: PropTypes.bool
    }))
  }).isRequired,
  isEdit: PropTypes.bool
}
