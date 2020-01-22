import React, { useContext } from 'react';
import AppContext from '../../AppContext';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import MainHeader from '../MainHeader/MainHeader';
import MainHeaderNav from '../MainHeaderNav/MainHeaderNav';
import MainNavLink from '../MainNavLink/MainNavLink';
import SignOutLink from '../SignOutLink/SignOutLink';
import Avatar from '../Avatar/Avatar';
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
        <MainHeader heightClass="dbl-height">
          <div className="dashboard-header-container avatar-section ">
            <div className="flex-center-between">
              <Avatar
                className="Main--avatar"
                imgUrl={context.user.imgUrl}
                username={context.user.username}
                />
                <h1 className="Main--header--title username">{context.user.username}</h1>
            </div>
          </div>
        </MainHeader>
        <MainHeaderNav links={[
          <MainNavLink to={`/dashboard/${context.user.id}`}>Edit Profile</MainNavLink>,
          // <MainNavLink to={`/public/signin`}>Sign Out</MainNavLink>
          <SignOutLink />
        ]}/>
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
