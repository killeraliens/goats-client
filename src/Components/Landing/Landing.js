import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import './Landing.css'
import MainNav from '../MainNav/MainNav'
import MainHeaderNav from '../MainHeaderNav/MainHeaderNav'
import MainNavLink from '../MainNavLink/MainNavLink'
import MainHeader from '../MainHeader/MainHeader'
import Intro from '../Intro/Intro'
import About from '../About/About'
import SignInForm from '../Forms/SignInForm/SignInForm'
import SignUpForm from '../Forms/SignUpForm/SignUpForm'
import RecoverPasswordForm from '../Forms/RecoverPasswordForm/RecoverPasswordForm'
import ResetPasswordForm from '../Forms/ResetPasswordForm/ResetPasswordForm'
import Footer from '../Footer/Footer'
import AppContext from '../../AppContext'

export default function Landing() {
  const context = useContext(AppContext)
  return(
    <div className="Landing">
      <MainHeader heightClass="dbl-height">
      </MainHeader>
      <MainHeaderNav
        links={[
          <MainNavLink to="/fliers" onClick={() => context.setToast({ message: 'Unauthorized'})}>Flier Feed</MainNavLink>,
          <MainNavLink to="/public/signin">Sign In</MainNavLink>
        ]}
      />
      <MainNav
        links={[
          <MainNavLink to="/public/intro">Intro</MainNavLink>,
          <MainNavLink to="/public/about">About</MainNavLink>
        ]}
      />
      <Switch>
        <Route exact path="/public/intro" component={Intro} />
        <Route path="/public/about" component={About} />
        <Route path="/public/signin" component={SignInForm} />
        <Route path="/public/signup" component={SignUpForm} />
        <Route path="/public/recover" component={RecoverPasswordForm} />
        <Route path="/public/reset/:token" component={ResetPasswordForm} />
        <Redirect to="/public/signin" />
      </Switch>
      <Footer />
    </div>
  )
}
