import React from 'react'

export default function ValidationError({ message, visible }) {
  return message && visible
    ? <span className="ValidationError error">{message}</span>
    : <span classname="ValidationError null"></span>
}
