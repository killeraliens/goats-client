import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
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
        <Redirect to="/public/signin" />
      </Switch>
    </div>
  )
}
