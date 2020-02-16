import React from 'react';
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

export default function Feed({ flyers, fetching, fetchingAdditional, total, handleClickLoad }) {

  if (fetching) {
    return <Spinner />
  }

  return(
    <div className="Feed">
      {flyers.map(flyer => {
        return <FlyerCard key={flyer.id} flyer={flyer} flyerEvents={flyer.events} />
      })}
      <div>
        {fetchingAdditional
          ? <Spinner />
            : flyers.length === 0
            ? null
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
  fetching: false,
  fetchingAdditional: false,
  total: 0,
  handleClickLoad: () => {}
}

Feed.propTypes = {
  flyers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
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
        id: PropTypes.string.isRequired,
        flyer_id: PropTypes.string.isRequired,
        event_date: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.instanceOf(Date)
        ]),
        venue_name: PropTypes.string,
        country_name: PropTypes.string,
        region_name: PropTypes.string,
        city_name: PropTypes.string,
        city_id: PropTypes.number
      })).isRequired,
  })),
  fetching: PropTypes.bool,
  fetchingAdditional: PropTypes.bool,
  total: PropTypes.number,
  handleClickLoad: PropTypes.func
}


