import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import AuthedContext from '../../AuthedContext'
import AppContext from '../../AppContext'
import './Footer.css'

export default function Footer() {
  const appFetching = useContext(AppContext).fetching
  const authedFetching = useContext(AuthedContext).fetching
  if (appFetching || authedFetching) {
    return null
  }
  return(
    <footer className="Footer">
      <p>
        <FontAwesomeIcon icon={faCopyright} />Copyright 2019, 2020 GOATSGUIDE.
      </p>
    </footer>
  )
}
