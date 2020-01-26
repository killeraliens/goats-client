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
  const context = useContext(AppContext)
  const paramsId = match.params.user_id
  console.log("Page ID", paramsId)
  console.log("USERS", users)
  const foundUser = users.find(user => user.id == paramsId) || {};
  console.log("found", foundUser)
  const userFlyers = flyers.filter(flyer => flyer.creator_id == foundUser.id)
  /* eslint eqeqeq: 0 */
  if (foundUser && context.user && context.user.id == paramsId) {
    return(
      <div className="Dashboard">
        <MainHeaderNav links={[
          <MainNavLink to={`/dashboard/${foundUser.id}/edit`}>Edit Profile</MainNavLink>,
          <SignOutLink />
        ]}/>
        <Switch>
          <Route exact path={`/dashboard/${foundUser.id}`} render={() => {
            return <Profile user={foundUser} userFlyers={userFlyers} events={events} users={users} fetching={fetching} />
          }} />
          <Route path={`/dashboard/${foundUser.id}/edit`} component={EditProfileForm}/>
        </Switch>

      </div>
    )
  }
  return (
    <div className="Dashboard">
      {foundUser ? <Profile user={foundUser} userFlyers={userFlyers} events={events} users={users} fetching={fetching} /> : <p>User Not Found</p>}
    </div>
  )
}

Dashboard.defaultProps = {
  match: { params: {} },
  users: []
}

Dashboard.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    username: PropTypes.string
  }))
}

//export default withRouter(Dashboard)
export default Dashboard
