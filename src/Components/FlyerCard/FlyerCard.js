import React from 'react';
import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import ThroughDates from './ThroughDates';
import Locations from './Locations';
import Accordian from '../Accordian/Accordian';
import Location from './Location';
import './FlyerCard.css';



export default function FlyerCard({ flyer, flyerEvents }) {

  const flyerDetails = [
    {
      i: 0,
      title: '...Flyer Details',
      section: <div><p>{flyer.bands}</p><p>{flyer.details}</p></div>
    }
  ];
  const fullTourListing = [
    {
      i: 0,
      title: <Location isTourAbbrev={true}/>,
      section: <div><p>{flyer.bands}</p><p>{flyer.details}</p></div>
    }
  ];

  return(
    <div className="FlyerCard Card">
      <div className="Card Flyer-card">
        <img className="Flyer--image"
          src={flyer.image_url}
          alt={flyer.headline}
        />
        <div className="Card--body">
          <div className="Card--header">
            <div className="Flyer--icon-type Tag">{flyer.type}</div>
            <h2>{flyer.headline}</h2>
          </div>
          <ThroughDates flyerEvents={flyerEvents} />
          {flyer.type === "Tour"
            ? (
              <Accordian triggerNode={<Location isTourAbbrev={true} />}>
                <Locations flyerEvents={flyerEvents} isFullTourListing={true} />
              </Accordian>
            )
            : <Locations flyerEvents={flyerEvents} />
          }


        </div>
        <div className="Comments">
          <div className="Comment">
            <div className="Comment--header">
              <div className="flex-center-between">
                <img
                  className="Avatar-small"
                  src="./assets/avatar-a.jpg"
                  alt="killeraliens avatar"
                />
                <h3 className="Comment--handle">
                  @killeraliens
                  <span className="Comment--isCreator">[creator]</span>
                </h3>
                </div>
                <span className="Comment--modified-at">mentioned: Jan 10, 2020 - 22:33 MST</span>
              </div>
              <p>could someone comment with an official list of bands?</p>
            </div>
          </div>
        </div>
    </div>
  )
}

FlyerCard.defaultProps = {
  flyer: {},
  flyerEvents: []
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
    type: PropTypes.oneOf([
      "Fest",
      "Tour",
      "Show"
    ]).isRequired,
    image_url: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    created: PropTypes.string,
    modified: PropTypes.string,
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
  }),
  flyerEvents: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }))
}
