import React, { useState, useEffect, useContext } from 'react';
import config from '../../config'
import './FlyerCardMenu.css'
import AppContext from '../../AppContext';
import AuthedContext from '../../AuthedContext';
import DashContext from '../../DashContext'
import MainNavLink from '../MainNavLink/MainNavLink'
import MainNav from '../MainNav/MainNav'
import { Link } from 'react-router-dom';
import { faEllipsisH, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function FlyerCardMenu({ creatorId, flyerId }) {
  const [visible, setVisible] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [serverError, setServerError] = useState('')
  const { user } = useContext(AppContext)
  const { deleteFlyer } = useContext(AuthedContext)
  const { deleteFlyerDash } = useContext(DashContext)

  const handleDelete = async () => {
    setFetching(true)
    const options = {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      }
    }
    const response = await fetch(`${config.API_ENDPOINT}/flyer/${flyerId}`, options);
    if (!response.ok) {
      const body = await response.json();
      setServerError(body.message)
      setFetching(false)
    } else {
      setServerError(null)
      setFetching(false)
      deleteFlyer(flyerId)
      deleteFlyerDash(flyerId)
    }
  }


  if (visible) {
    if (((user && user.id) && (user.id === creatorId)) || (user && user.admin)) {
      return (
        <div className='FlyerCardMenu'>
          <MainNav className={`FlyerCardMenu--Nav`}>
            <MainNavLink
              callback={handleDelete}
              activeColorClass={'red-white'}
              to="#"
            >
              {fetching
                ? '...'
                : user.admin && creatorId != user.id
              ? <span><FontAwesomeIcon icon={faShieldAlt} />{' '}Delete</span>
                : `Delete` }
            </MainNavLink>
          </MainNav>
          <Link to="#" className="handle" onClick={() => setVisible(prev => !prev)}>
            <FontAwesomeIcon icon={faEllipsisH} />
          </Link>
        </div>
      )
    }
    return (
      <div className='FlyerCardMenu'>
        {/* <Link to="#" className="handle" onClick={() => setVisible(prev => !prev)}>
          <FontAwesomeIcon icon={faEllipsisH} />
        </Link> */}
      </div>
    )
  }

  if (((user && user.id) && (user.id === creatorId)) || (user && user.admin)) {
    return (
      <div className='FlyerCardMenuOpen'>
        <Link to="#" className="handle" onClick={() => setVisible(prev => !prev)}>
          <FontAwesomeIcon icon={faEllipsisH} />
        </Link>
      </div>
    )
  }

  return (
    <div className='FlyerCardMenu'>
      {/* <Link to="#" className="handle" onClick={() => setVisible(prev => !prev)}>
          <FontAwesomeIcon icon={faEllipsisH} />
        </Link> */}
    </div>
  )

}

