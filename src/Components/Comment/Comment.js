import React from 'react';
import Avatar from '../Avatar/Avatar';
export default function Comment({ user, isCreator, comment, modified }) {

  return (
    <div className="Comment">
        <div className="Comment--header">
          <div className="flex-center-between">
            <img
              className="Avatar-small"
              src="./assets/avatar-a.jpg"
              alt="killeraliens avatar"
            />
            <h3 className="Comment--handle">
              @killeraliens
                  <span className="Comment--isCreator">[creator]</span>
            </h3>
          </div>
          <span className="Comment--modified-at">mentioned: Jan 10, 2020 - 22:33 MST</span>
        </div>
        <p>could someone comment with an official list of bands?</p>
    </div>

  )
}

