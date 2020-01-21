import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AppContext from '../../AppContext';
import defaultAvatar from '../../assets/default-avatar.jpg'
import pentagram from '../../assets/pentagram-icon.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import './Menu.css'

export default function Menu() {
  const context = useContext(AppContext)
  let avatarImage = context.user.image_url ? context.user.image_url : defaultAvatar
  return (
    <div className="Menu">
      <div className="Menu--pal">
        <NavLink to="/forum" className="Menu--pal--btn">
          <img src={pentagram} alt="pentagram icon"/>
        </NavLink>
        <NavLink to={`/dashboard/${context.user.id}`} className="Menu--pal--btn">
          <img className="Avatar-small" src={avatarImage} alt="avatar link"/>
        </NavLink>
        <NavLink to="/create-flyer" className="Menu--pal--btn">
          <span>
            <FontAwesomeIcon className="i" icon={faFile} />
            <br />
            +FLIER
          </span>
        </NavLink>
      </div>
    </div>
  )
}
