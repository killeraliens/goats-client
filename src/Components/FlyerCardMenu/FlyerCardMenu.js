import React, { useState, useEffect, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import config from '../../config'
import './FlyerCardMenu.css'
import AppContext from '../../AppContext';
import AuthedContext from '../../AuthedContext';
import DashContext from '../../DashContext'
import MainNavLink from '../MainNavLink/MainNavLink'
import MainNav from '../MainNav/MainNav'
import { faEllipsisH, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FlyerCard from '../FlyerCard/FlyerCard';

function FlyerCardMenu({ creatorId, flyerId, hasHandle, history, match }) {
  const [visible, setVisible] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [serverError, setServerError] = useState(null)
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
      setServerError({ status: response.status, message: body.message })
      setFetching(false)
    } else {
      setServerError(null)
      setFetching(false)
      deleteFlyer(flyerId)
      deleteFlyerDash(flyerId)
      if (match.path === '/flyer/:flyer_id' || match.path === '/flyer/:flyer_id/edit') {
        history.goBack()
      }
    }
  }

  const isAuthed = ((user && user.id) && (user.id === creatorId)) || (user && user.admin)
  if (!hasHandle && isAuthed) {

    return (
      <MainNav className={`FlyerCardMenu--Nav inline-float-right`}>
        <MainNavLink
          callback={handleDelete}
          activeColorClass={'red-white'}
          to="#"
        >
          {fetching
            ? '  ...  '
            : user.admin && creatorId != user.id
              ? <span><FontAwesomeIcon icon={faShieldAlt} />{' '}Delete</span>
              : `Delete`}
        </MainNavLink>
      </MainNav>
    )
  }
  switch (true) {
    case visible && isAuthed:

      return (
        <div className='FlyerCardMenu'>
          <MainNav className={`FlyerCardMenu--Nav`}>
            <MainNavLink
              callback={handleDelete}
              activeColorClass={'red-white'}
              to="#"
            >
              {fetching
                ? '  ...  '
                : user.admin && creatorId != user.id
                  ? <span><FontAwesomeIcon icon={faShieldAlt} />{' '}Delete</span>
                  : `Delete`}
            </MainNavLink>
            <MainNavLink
              activeColorClass={'red-white'}
              to={`/flyer/${flyerId}/edit`}
            >
              {fetching
                ? '  ...  '
                : user.admin && creatorId != user.id
                  ? <span><FontAwesomeIcon icon={faShieldAlt} />{' '}Edit</span>
                  : `Edit`}
            </MainNavLink>
          </MainNav>
          <a className="handle" onClick={(e) => setVisible(prev => !prev)}>
            <FontAwesomeIcon icon={faEllipsisH} />
          </a>
        </div>
      )

    case visible && !isAuthed:
      return (
        <div className='FlyerCardMenu'>
          {/* <Link to="#" className="handle" onClick={() => setVisible(prev => !prev)}>
          <FontAwesomeIcon icon={faEllipsisH} />
        </Link> */}
        </div>
      )

    case !visible && isAuthed:
      return (
        <div className='FlyerCardMenuOpen'>
          <a  className="handle" onClick={(e) => setVisible(prev => !prev)}>
            <FontAwesomeIcon icon={faEllipsisH} />
          </a>
        </div>
      )

    default:
      return (
        <div className='FlyerCardMenu'>
          {/* <Link to="#" className="handle" onClick={() => setVisible(prev => !prev)}>
          <FontAwesomeIcon icon={faEllipsisH} />
        </Link> */}
        </div>
      )
  }

}


export default withRouter(FlyerCardMenu)

FlyerCardMenu.defaultProps = {
  hasHandle: true
}

FlyerCardMenu.propTypes = {
  creatorId: PropTypes.string.isRequired,
  flyerId: PropTypes.string.isRequired
}
