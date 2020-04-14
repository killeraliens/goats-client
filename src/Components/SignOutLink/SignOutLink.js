import React, { useContext } from 'react';
import AppContext from '../../AppContext';
import MainNavLink from '../MainNavLink/MainNavLink';

export default function SignOutLink() {
  const { updateAuthenticated, setToast } = useContext(AppContext)
  return (
    <MainNavLink
      callback={() => {
        setToast({ message: `Signed out.` })
        updateAuthenticated(null)
      }}
      to={`/public/signin`}
    >
      Sign Out
    </MainNavLink>
  )
}
