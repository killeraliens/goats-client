import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import MainHeader from '../MainHeader/MainHeader';
import Avatar from '../Avatar/Avatar';
import Feed from '../Feed/Feed';
import MainNav from '../MainNav/MainNav';
import MainNavLink from '../MainNavLink/MainNavLink';
import './Profile.css';

export default function Profile({ user, isCurrent, users, events, userFlyers, fetching }) {
  const publicFlyers = userFlyers.filter(flyer => flyer.listing_state === "Public")
  const draftFlyers = userFlyers.filter(flyer => flyer.listing_state === "Draft")
  // const draftsLink = isCurrent
  //   ? <MainNavLink to={`/dashboard/${user.id}/drafts`} >Drafts</MainNavLink>
  //   : null;
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
            <h1 className="Main--header--title username">{user.username}</h1>
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
          Contributions
        </MainNavLink>,
        // draftsLink
      ]} />
      <div className="Main--content">
        <Switch>
          <Route exact path={`/dashboard/${user.id}`} render={() => {
            return <Feed flyers={publicFlyers} events={events} users={users} fetching={fetching} />
          }} />
          <Route path={`/dashboard/${user.id}/contributions`} render={() => {
            return <Feed flyers={publicFlyers} events={events} users={users} fetching={fetching} />
          }} />
          <Route path={`/dashboard/${user.id}/drafts`} render={() => {
            return <Feed flyers={draftFlyers} events={events} users={users} fetching={fetching} />
          }} />
        </Switch>
      </div>
    </div>
  )
}

Profile.propTypes = {
  userFlyers: PropTypes.arrayOf(PropTypes.shape({
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
  user: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired,
    username: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired
  }),
  fetching: PropTypes.bool
}
