import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import config from '../../config'
import './FlyerCardMenu.css'
import AppContext from '../../AppContext';
import AuthedContext from '../../AuthedContext';
import DashContext from '../../DashContext'
import MainNavLink from '../MainNavLink/MainNavLink'
import MainNav from '../MainNav/MainNav'
import { faPen, faShieldAlt, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      if (match.path === '/flier/:flyer_id' || match.path === '/flier/:flyer_id/edit') {
        history.goBack()
      }
    }
  }

  const isAuthed = ((user && user.id) && (user.id === creatorId)) || (user && user.admin)

  switch (true) {
    case serverError:
      return null //replace with error modal

    // if no handle return delete button only
    case !hasHandle && isAuthed:
      return (
        <div className='FlyerCardMenu'>
          <MainNav className={`FlyerCardMenu--Nav inline-float-right`}>
            <MainNavLink
              callback={handleDelete}
              activeColorClass={'red-white'}
              to="#"
            >
              {fetching
                ? '  ...  '
                : 'Delete'}
            </MainNavLink>
          </MainNav>
        </div>
      )

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
                  : 'Delete'}
            </MainNavLink>
            <MainNavLink
              activeColorClass={'red-white'}
              to={`/flier/${flyerId}/edit`}
            >
              {fetching
                ? '  ...  '
                  : `Edit`}
            </MainNavLink>
          </MainNav>
          <a className="handle" onClick={(e) => setVisible(prev => !prev)}>
            <FontAwesomeIcon className="active" icon={faPen} />
            {
              user.admin && creatorId != user.id
                  ?  <FontAwesomeIcon className="active" icon={faShieldAlt} style={{ marginLeft: '4px'}}/>
                  : null
            }
          </a>
        </div>
      )

    case !visible && isAuthed:
      return (
        <div className='FlyerCardMenuClosed'>
          <a  className="handle" onClick={(e) => setVisible(prev => !prev)}>
            <FontAwesomeIcon icon={faPen} />
            {
              user.admin && creatorId != user.id
                ? <FontAwesomeIcon icon={faShieldAlt} style={{ marginLeft: '4px'}}/>
                : null
            }
          </a>
        </div>
      )

    default:
      return null
  }

}


export default withRouter(FlyerCardMenu)

FlyerCardMenu.defaultProps = {
  hasHandle: true
}

FlyerCardMenu.propTypes = {
  creatorId: PropTypes.string.isRequired,
  flyerId: PropTypes.string.isRequired,
  hasHandle: PropTypes.bool,
  history: PropTypes.object,
  match: PropTypes.object
}
