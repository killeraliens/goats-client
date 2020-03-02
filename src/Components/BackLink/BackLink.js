import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import './BackLink.css'

function BackLink({ history, children, className, hasArrow }) {
  return (
    <div className={className}>
      <a onClick={() => history.goBack()} >
        {hasArrow ? <span style={{ marginRight: '16px'} }>{'<<'}Back</span> : null }{children}
      </a>
    </div>
  )
}

export default withRouter(BackLink)

 BackLink.defaultProps = {
   hasArrow: true,
   className: 'BackLink'
 }

 BackLink.propTypes = {
   history: PropTypes.object,
   children: PropTypes.oneOfType([
     PropTypes.arrayOf(PropTypes.node),
     PropTypes.node
   ]),
   className: PropTypes.string,
   hasArrow: PropTypes.bool
 }
