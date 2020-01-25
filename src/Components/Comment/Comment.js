import React from 'react';
import Avatar from '../Avatar/Avatar';
export default function Comment({ user, isCreator, comment, modified }) {

  return (
    <div className="Comment">
        <div className="Comment--header">
          <div className="flex-center-between">
            <Avatar
              imageUrl={user.image_url}
              username={user.username}
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

