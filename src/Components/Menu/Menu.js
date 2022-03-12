import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AppContext from '../../AppContext';
import defaultAvatar from '../../assets/default-avatar.jpg'
import Avatar from '../Avatar/Avatar'
import pentagram from '../../assets/pentagram-icon.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import './Menu.css'

export default function Menu() {
  const context = useContext(AppContext)
  let avatarUrl = context.user.image_url ? context.user.image_url : defaultAvatar
  return (
    <div className="Menu scrollable">
      <div className="Menu--pal">
        <NavLink to="/flyers" className="Menu--pal--btn">
          <img src={pentagram} alt="pentagram icon"/>
        </NavLink>
        <NavLink to={`/dashboard/${context.user.id}`} className="Menu--pal--btn">
          <Avatar
            className="Avatar-small"
            imageUrl={avatarUrl}
            username={context.user.username}
            />
        </NavLink>
        <NavLink to="/post" className="Menu--pal--btn">
          <span>
            <FontAwesomeIcon className="i" icon={faFile} />
            <br />
            +FLYER
          </span>
        </NavLink>
      </div>
    </div>
  )
}
