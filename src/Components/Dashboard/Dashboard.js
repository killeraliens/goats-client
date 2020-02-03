import React, { useContext } from 'react';
import AppContext from '../../AppContext';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import MainHeaderNav from '../MainHeaderNav/MainHeaderNav';
import MainNavLink from '../MainNavLink/MainNavLink';
import SignOutLink from '../SignOutLink/SignOutLink';
import EditProfileForm from '../Forms/EditProfileForm/EditProfileForm';
import Profile from '../Profile/Profile';
import './Dashboard.css'

function Dashboard({ match, users, flyers, events, fetching }) {
  //console.log("match path in Dash", match.path)
  const context = useContext(AppContext)
  const paramsId = match.params.user_id
  /* eslint eqeqeq: 0 */
  console.log(context.user)

  const foundUser = users.find(user => user.id == paramsId);
  /* eslint eqeqeq: 0 */
  const userFlyers = flyers.filter(flyer => flyer.creator_id  == foundUser.id) //parseINt
  // const publicFlyers = userFlyers.filter(flyer => flyer.listing_state === "Public")
  //const draftFlyers = userFlyers.filter(flyer => flyer.listing_state === "Draft")
  /* eslint eqeqeq: 0 */
  if (foundUser && context.user && context.user.id == paramsId) {
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
  return (
    <div className="Dashboard">
      {foundUser ? <Profile user={foundUser} isCurrent={false} userFlyers={userFlyers} events={events} users={users} fetching={fetching} /> : <p>User Not Found</p>}
    </div>
  )
}

Dashboard.defaultProps = {
  match: { params: {} }
}

Dashboard.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  flyers: PropTypes.arrayOf(PropTypes.shape({
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
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired
  })),
  fetching: PropTypes.bool
}

//export default withRouter(Dashboard)
export default Dashboard
