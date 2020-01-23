import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import './Spinner.css'

export default () =>
  <div className='spinner'>
    <FontAwesomeIcon className='rotating' icon={faSpinner} color='white' />
  </div>
