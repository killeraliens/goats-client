import React, { useContext } from 'react'
import AppContext from '../../AppContext'
import './SettingsMenu.css'
import MainHeader from '../MainHeader/MainHeader'
import MainHeaderNav from '../MainHeaderNav/MainHeaderNav'
import MainNavLink from '../MainNavLink/MainNavLink'
import { faTimes, faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InlineForm from '../Forms/InlineForm/InlineForm'

export default function SettingsMenu({ user, history }) {

  return <div className="SettingsMenu">
    <MainHeaderNav className="settings" links={[
      <MainNavLink
        to={`/dashboard/${user.id}`}
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
    <MainHeader>
      <span>Username</span>
      <InlineForm nameDB="username" name="username"/>
    </MainHeader>
    <MainHeader>
      <span>Email</span>
    </MainHeader>
    <MainHeader>
      <span>Password</span>
    </MainHeader>
  </div>
}
