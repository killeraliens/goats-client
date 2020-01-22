import React, { useContext } from 'react';
import AppContext from '../../AppContext';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import MainHeader from '../MainHeader/MainHeader';
import MainHeaderNav from '../MainHeaderNav/MainHeaderNav';
import MainNavLink from '../MainNavLink/MainNavLink';
import SignOutLink from '../SignOutLink/SignOutLink';
import Avatar from '../Avatar/Avatar';
import EditProfileForm from '../Forms/EditProfileForm/EditProfileForm';
import Profile from '../Profile/Profile';
import './Dashboard.css'

function Dashboard(props) {
  const context = useContext(AppContext)
  const paramsId = props.match.params.user_id
  console.log("Page ID", paramsId)
  //const user = context.users.find(user => user.id == props.match.params.userId) || {};
  //console.log("PROFILE CONTEXT", context.user)

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
          <Route exact path={`/dashboard/${context.user.id}`} component={Profile} />
          <Route path={`/dashboard/${context.user.id}/edit`} component={EditProfileForm}/>
        </Switch>

      </div>
    )
  }
  return (
    <div>
      User {props.user.username}'s public profile
    </div>
  )
}

Dashboard.defaultProps = {
  match: { params: {} },
  user: {}
}

Dashboard.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  user: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  })
}

//export default withRouter(Dashboard)
export default Dashboard
