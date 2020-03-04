import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import './BackLink.css'
import Sword from '../Sword/Sword'

function BackLink({ history, children, className, hasArrow, backText }) {
  return (
    <div className={`BackLink ${className ? className : ''}`}>
      <a onClick={() => history.goBack()} >
        <React.Fragment>{
          hasArrow
            ? <span><Sword width='36px' direction='left' /></span>
            : null
        }{
          backText
            ? <span></span>
            : null
        }</React.Fragment>
        {children}
      </a>
    </div>
  )
}

export default withRouter(BackLink)

 BackLink.defaultProps = {
   hasArrow: false,
   backText: false,
 }

 BackLink.propTypes = {
   history: PropTypes.object,
   children: PropTypes.oneOfType([
     PropTypes.arrayOf(PropTypes.node),
     PropTypes.node
   ]),
   className: PropTypes.string,
   hasArrow: PropTypes.bool,
   backText: PropTypes.bool,
 }
