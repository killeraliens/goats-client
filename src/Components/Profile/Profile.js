import React, { useContext } from 'react';
import AppContext from '../../AppContext';
import MainHeader from '../MainHeader/MainHeader';
import Avatar from '../Avatar/Avatar';
import Feed from '../Feed/Feed';
import MainNav from '../MainNav/MainNav';
import MainNavLink from '../MainNavLink/MainNavLink';

import './Profile.css';


export default function Profile({ user, userFlyers }) {
  //const context = useContext(AppContext)

  return(
    <div className="Profile">
      <MainHeader heightClass="dbl-height">
        <div className="dashboard-header-container avatar-section ">
          <div className="flex-center-between">
            <Avatar
              className="Main--avatar"
              imgUrl={user.image_url}
              username={user.username}
            />
            <h1 className="Main--header--title username">{user.username}</h1>
          </div>
        </div>
      </MainHeader>
      <MainNav links={[
        <MainNavLink to={`/dashboard/${user.id}`} >Contributions</MainNavLink>,
        <MainNavLink to={`/dashboard/${user.id}/starred`} >Starred</MainNavLink>
      ]} />

      <div className="Main--content">
      </div>
    </div>
  )
}

Profile.defaultProps = {
  user: {}
}
