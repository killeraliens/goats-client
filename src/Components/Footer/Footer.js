import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import './Footer.css'

export default function Footer() {
  return(
    <footer className="Footer">
      <p>
        <FontAwesomeIcon icon={faCopyright} />Copyright 2019, 2020 Goat's Guide.
      </p>
    </footer>
  )
}
