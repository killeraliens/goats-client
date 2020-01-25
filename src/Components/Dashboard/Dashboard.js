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

function Dashboard({ match, users, flyers }) {
  const context = useContext(AppContext)
  const paramsId = match.params.user_id
  console.log("Page ID", paramsId)
  console.log("USERS", users)
  const foundUser = users.find(user => user.id == match.params.userId) || null;
  //console.log("PROFILE CONTEXT", context.user)

  /* eslint eqeqeq: 0 */
  if (context.user && context.user.id == paramsId) {
    // return(<div>
    //   User{context.user.username} is logged in
    // </div>)
    return(
      <div className="Dashboard">

        <MainHeaderNav links={[
          <MainNavLink to={`/dashboard/${context.user.id}/edit`}>Edit Profile</MainNavLink>,
          <SignOutLink />
        ]}/>

        <Switch>
          <Route exact path={`/dashboard/${context.user.id}`} render={() => {
            return <Profile user={context.user} />
          }} />
          <Route path={`/dashboard/${context.user.id}/edit`} component={EditProfileForm}/>
        </Switch>

      </div>
    )
  }
  return (
    <div className="Dashboard">
      {foundUser ? <Profile user={foundUser} /> : <p>User Not Found</p>}
    </div>
  )
}

Dashboard.defaultProps = {
  match: { params: {} },
  users: []
}

//MENTOR QUESTION: how do i handle props.user (required or default?)
Dashboard.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  users: PropTypes.arrayOf({
    user: PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
      username: PropTypes.string
    })
  })
}

//export default withRouter(Dashboard)
export default Dashboard
