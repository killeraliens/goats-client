import React from 'react';
import AppContext from './AppContext';

export default function ProfilePg(props) {

  return (
    <AppContext.Consumer>
      {(context) => {
        return props.user
        ? (
            <div className="ProfilePg">
              <h2>{props.user.username ? props.user.username : props.user.fullname}</h2>
              <div className="ProfilePg_content">

              </div>
            </div>
          )
        : null
      }}
    </AppContext.Consumer>
  )
}
