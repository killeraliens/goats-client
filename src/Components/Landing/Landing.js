import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './Landing.css';
import MainNav from '../MainNav/MainNav';
import MainHeaderNav from '../MainHeaderNav/MainHeaderNav';
import MainNavLink from '../MainNavLink/MainNavLink';
import MainHeader from '../MainHeader/MainHeader';
import Intro from '../Intro/Intro';
import About from '../About/About';
import SignInForm from '../Forms/SignInForm/SignInForm';
import SignUpForm from '../Forms/SignUpForm/SignUpForm';

export default function Landing(props) {
  return(
    <div className="Landing">
      <MainHeader heightClass="dbl-height">
        <p>[<em>placeholder for goat skull illustration</em>]</p>
      </MainHeader>
      <MainHeaderNav
        links={[
          <MainNavLink to="/signin">Sign In</MainNavLink>
        ]}
      />
      <MainNav
        links={[
          <MainNavLink to="/intro">Intro</MainNavLink>,
          <MainNavLink to="/about">About</MainNavLink>
        ]}
      />
      <Switch>
        <Route exact path="/intro" component={Intro} />
        <Route path="/about" component={About} />
        <Route path="/signin" component={SignInForm} />
        <Route path="/signup" component={SignUpForm} />
      </Switch>
    </div>
  )
}
