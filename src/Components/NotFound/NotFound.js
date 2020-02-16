import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import notFoundImage from '../../assets/leatherfaceraw.jpg';
import AppContext from '../../AppContext';
import './NotFound.css'
import AuthedContext from '../../AuthedContext';
import Spinner from '../Spinner/Spinner';

export default function NotFound({ message, link, isFetching }) {
  const { user } = useContext(AppContext)
  const { fetching } = useContext(AuthedContext)
  if (fetching || isFetching) {
    return <Spinner />
  }
  return (
    <div
      className="NotFound"
      style={{ backgroundImage: 'url(' + notFoundImage + ')' }}
      alt={`not found background`}
    >
      {Boolean(user) && Boolean(user.id) && !link
        ? (
          <div>
            <p>{message}</p>
            <p><Link to={`/dashboard/${user.id}`}>Back to dashboard</Link></p>
          </div >
        )
        : Boolean(user) && Boolean(user.id) && !!link
        ? (
          <div>
            <p>{message}</p>
            <p> {link}</p>
          </div >
        )
        : (
          <div>
            <p>{ message }</p>
            <p> <Link to="/public/signin">Back to sign in</Link></p>
          </div >
         )}
    </div>
  )
}

NotFound.defaultProps = {
  message: 'Page not found'
}

NotFound.propTypes = {
  message: PropTypes.string,
  link: PropTypes.element
}
