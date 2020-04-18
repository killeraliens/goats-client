import React, { useContext } from 'react'
import AppContext from '../../AppContext'
import './SettingsMenu.css'
import MainHeader from '../MainHeader/MainHeader'
import MainHeaderNav from '../MainHeaderNav/MainHeaderNav'
import MainNavLink from '../MainNavLink/MainNavLink'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function SettingsMenu({ user, history }) {
  const { updateAuthenticated } = useContext(AppContext)
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
      <h1 className="Main--header--title">Settings</h1>
    </MainHeader>
    <MainHeader>
      Username
    </MainHeader>
    <MainHeader>
      Email
    </MainHeader>
    <MainHeader>
      Password
    </MainHeader>

    <MainHeader>
      Username
    </MainHeader>
    <MainHeader>
      Email
    </MainHeader>
    <MainHeader>
      Password
    </MainHeader>

    <MainHeader>
      Username
    </MainHeader>
    <MainHeader>
      Email
    </MainHeader>
    <MainHeader>
      Password
    </MainHeader>
    {/* <ul>
      <li>Username</li>
      <li>Account Email</li>
      <li>Password</li>
    </ul> */}
  </div>
}
