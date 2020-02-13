import React, { useContext } from 'react';
import AppContext from '../../AppContext';
import AuthedContext from '../../AuthedContext';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import MainHeaderNav from '../MainHeaderNav/MainHeaderNav';
import MainNavLink from '../MainNavLink/MainNavLink';
import SignOutLink from '../SignOutLink/SignOutLink';
import EditProfileForm from '../Forms/EditProfileForm/EditProfileForm';
import Profile from '../Profile/Profile';
import './Dashboard.css'
import NotFound from '../NotFound/NotFound';
import Spinner from '../Spinner/Spinner';

function Dashboard({ match }) {
  const { user } = useContext(AppContext)
  const { flyers, events, users, fetching } = useContext(AuthedContext)
  const paramsId = match.params.user_id
  const foundUser = users.find(user => user.id === paramsId);
  const userFlyers = foundUser
    ? flyers.filter(flyer => flyer.creator_id === foundUser.id)
    : []
  // const publicFlyers = userFlyers.filter(flyer => flyer.listing_state === "Public")
  //const draftFlyers = userFlyers.filter(flyer => flyer.listing_state === "Draft")
  if (foundUser && user && user.id === paramsId) {
    return(
      <div className="Dashboard">
        <MainHeaderNav links={[
          <MainNavLink to={`/dashboard/${foundUser.id}/edit`}>Edit Profile</MainNavLink>,
          <SignOutLink />
        ]}/>
        <Switch>
          <Route exact path={`/dashboard/${foundUser.id}/edit`} render={({ history }) => {
            return <EditProfileForm history={history}/>
          }}/>
          <Route path={`/dashboard/${foundUser.id}`} render={() => {
            return <Profile user={foundUser} isCurrent={true} userFlyers={userFlyers} events={events} users={users} fetching={fetching} />
          }} />
        </Switch>
      </div>
    )
  }
  if(foundUser) {
    return (
      <div className="Dashboard">
        <Profile user={foundUser} isCurrent={false} userFlyers={userFlyers} events={events} users={users} fetching={fetching} />
      </div>
    )
  }
  if(fetching) {
    return (
      <div className="Dashboard">
        <Spinner />
      </div>
    )
  }
  return (
    <div className="Dashboard">
      <NotFound message="User doesn't exist" />
    </div>
  )
}

Dashboard.defaultProps = {
  match: { params: {} },
  fetching: false
}

Dashboard.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  })
}

export default Dashboard
