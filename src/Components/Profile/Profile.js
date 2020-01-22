import React, { useContext } from 'react';
import AppContext from '../../AppContext';
import MainHeader from '../MainHeader/MainHeader';
import Avatar from '../Avatar/Avatar';

import './Profile.css';


export default function Profile(props) {
  const context = useContext(AppContext)
  // let avatarImage = context.user.image_url ? context.user.image_url : defaultAvatar
  return(
    <div className="Profile">
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
      <div className="Main--content">
      </div>
    </div>
  )
}
