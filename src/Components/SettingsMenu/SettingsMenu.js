import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../../AppContext'
import './SettingsMenu.css'
import MainHeader from '../MainHeader/MainHeader'
import MainHeaderNav from '../MainHeaderNav/MainHeaderNav'
import MainNavLink from '../MainNavLink/MainNavLink'
import { faTimes, faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SettingForm from '../Forms/SettingForm/SettingForm'

export default function SettingsMenu({ user }) {

  return <div className="SettingsMenu">
    <MainHeaderNav className="settings" links={[
      <MainNavLink
        to={`/dashboard/${user.id}`}
        isActive={() => false}
      >
        close{' '}<FontAwesomeIcon icon={faTimes}/>
      </MainNavLink>
    ]}>
    </MainHeaderNav>
    <MainHeader heightClass="dbl-height">
      <h1 className="Main--header--title">
        <FontAwesomeIcon icon={faCog} />
        {' '}Settings
      </h1>
    </MainHeader>
    <SettingForm name="username"/>
    <SettingForm name="email" type="email"/>
    <SettingForm name="password" type="password"/>
    <Link to={`/dashboard/${user.id}`}>Cancel</Link>
  </div>
}
