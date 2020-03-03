import React from 'react'
import sword from '../../assets/dagger.svg'
import './Sword.css'

export default function Sword({ width, direction, className}) {
  return (
    <div className={`Sword ${className ? className : ''}`}>
      <img src={sword} className={`${direction ? direction : className ? className : ''}`} style={{ width: width, height: 'auto' }} />
    </div>
  )
}

Sword.defaultProps = {
  width: '60px',
  direction: 'right'
}
