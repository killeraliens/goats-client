import React, { useContext } from 'react';
import AppContext from '../../AppContext';
import MainNavLink from '../MainNavLink/MainNavLink';

export default function SignOutLink() {
  const context = useContext(AppContext)
  return (
    <MainNavLink
      callback={() => context.updateAuthenticated(null)}
      to={`/public/signin`}
    >
      Sign Out
    </MainNavLink>
  )
}
