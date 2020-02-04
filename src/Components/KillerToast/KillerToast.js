import React, { useState, useEffect } from 'react'
import './KillerToast.css'

export default function KillerToast({ message }) {
  const [alive, setAlive] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setAlive(false)
    }, 5000);
  }, [])

  if (alive) {
    return(
      <div className={`SuccessBox profile-blue`}>
        <p>{message}</p>
      </div>
    )
  }
  return null
}

KillerToast.defaultProps = {
  message: 'Success!'
}
