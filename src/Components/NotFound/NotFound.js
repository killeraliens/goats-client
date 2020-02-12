import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import notFoundImage from '../../assets/leatherfaceraw.jpg';
import AppContext from '../../AppContext';
import './NotFound.css'

export default function NotFound({ message, link }) {
  const context = useContext(AppContext)
  return (
    <div
      className="NotFound"
      style={{ backgroundImage: 'url(' + notFoundImage + ')' }}
      alt={`not found background`}
    >
      {Boolean(context.user) && Boolean(context.user.id) && !link
        ? (
          <div>
            <p>{message}</p>
            <p><Link to={`/dashboard/${context.user.id}`}>Back to dashboard</Link></p>
            <p> <Link to="/public/signin">Back to sign in (temp dummy escape hatch)</Link></p>
          </div >
        )
        : Boolean(context.user) && Boolean(context.user.id) && !!link
        ? (
          <div>
            <p>{message}</p>
            <p> {link}</p>
            <p> <Link to="/public/signin">Back to sign in (temp dummy escape hatch)</Link></p>
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
  message: 'Page not found',
  //link: <Link to="/public/signin">Back to sign in</Link>
}

NotFound.propTypes = {
  message: PropTypes.string,
  link: PropTypes.element
}
