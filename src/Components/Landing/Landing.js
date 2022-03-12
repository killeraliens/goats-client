import React, { useContext, useEffect } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
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

function Landing({ location }) {
  const context = useContext(AppContext)
  const toastAlert = () => {
    if (location.state && location.state.status === 'Unauthorized') {
      return context.setToast({ message: 'You need to sign up or sign in.', colorClass: 'error', timeout: 2000 })
    }
    return
  }

  return(
    <div className="Landing">
      <MainHeader heightClass="dbl-height">
      </MainHeader>
      <MainHeaderNav
        links={[
          <MainNavLink to="/flyers" callbackRedirect={toastAlert}>Flyer Feed</MainNavLink>,
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

export default withRouter(Landing)
