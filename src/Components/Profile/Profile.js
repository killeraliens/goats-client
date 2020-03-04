import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import MainHeader from '../MainHeader/MainHeader';
import Avatar from '../Avatar/Avatar';
import Feed from '../Feed/Feed';
import MainNav from '../MainNav/MainNav';
import MainNavLink from '../MainNavLink/MainNavLink';
import NotFound from '../NotFound/NotFound'
import Location from '../FlyerCard/Location'
import './Profile.css';

export default function Profile({ user, isCurrent, userFlyers, fetching }) {
  const publicFlyers = userFlyers.filter(flyer => flyer.listing_state === "Public")
  const draftFlyers = userFlyers.filter(flyer => flyer.listing_state === "Draft")
  const draftsLink = isCurrent
    ? <MainNavLink to={`/dashboard/${user.id}/drafts`} >Drafts{' '}{draftFlyers.length}</MainNavLink>
    : null;


  return(
    <div className="Profile">
      <MainHeader heightClass="dbl-height">
        <div className="dashboard-header-container avatar-section ">
          <div className="flex-center-between">
            <Avatar
              className="Main--avatar"
              imageUrl={user.image_url}
              username={user.username}
            />
            <div >
              <h1 className="Main--header--title username">{user.username}</h1>
              <Location
              style={{color: 'blue'}}
              eventLocation={{
                city_name: user.city_name,
                region_name: user.region_name,
                country_name: user.country_name
              }}
                allCountryFields={true} />
            </div>
          </div>
        </div>
      </MainHeader>
      <MainNav links={[
        <MainNavLink
          to={`/dashboard/${user.id}/contributions`}
          isActive={(match, location) => {
            if (location.pathname === `/dashboard/${user.id}/contributions` || location.pathname === `/dashboard/${user.id}` || location.pathname === `/dashboard/${user.id}/`) {
              return true
            }
            return false
          }}
        >
          Contributions{' '}{publicFlyers.length}
        </MainNavLink>,
        draftsLink
      ]} />
      <div className="Main--content">
        <Switch>
          <Route exact path={`/dashboard/${user.id}`} render={() => {
            return <Feed flyers={publicFlyers} fetching={fetching} />
          }} />
          <Route path={`/dashboard/${user.id}/contributions`} render={() => {
            return <Feed flyers={publicFlyers} fetching={fetching} />
          }} />
          <Route path={`/dashboard/${user.id}/drafts`} render={() => {
            return <Feed flyers={draftFlyers} fetching={fetching} />
          }} />
        </Switch>
      </div>
    </div>
  )
}

Profile.defaultProps = {
  userFlyers: [],
  user: {
    image_url: '',
    country_name: '',
    region_name: '',
    city_name: '',
    city_id: null
  },
  isCurrent: false,
  fetching: false
}

Profile.propTypes = {
  userFlyers: PropTypes.arrayOf(PropTypes.shape({
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
      event_date: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date)
      ]),
      venue_name: PropTypes.string,
      country_name: PropTypes.string,
      region_name: PropTypes.string,
      city_name: PropTypes.string,
      city_id: PropTypes.number
    })).isRequired
  })),

  user: PropTypes.shape({
    id:PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    image_url: PropTypes.string,
    admin: PropTypes.bool.isRequired,
    country_name: PropTypes.string,
    region_name: PropTypes.string,
    city_name: PropTypes.string,
    city_id: PropTypes.number,
    created: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date)
    ]).isRequired
  }),

  isCurrent: PropTypes.bool,

  fetching: PropTypes.bool
}
