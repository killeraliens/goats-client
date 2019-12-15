import React from 'react'

export default function ValidationError(props) {
  return props.message && props.visible
    ? <div className="error">{props.message}</div>
    : null
}
