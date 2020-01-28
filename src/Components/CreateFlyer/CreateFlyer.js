import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainHeader from '../MainHeader/MainHeader';
import MainNav from '../MainNav/MainNav';
import MainNavLink from '../MainNavLink/MainNavLink';
import AddShowForm from '../Forms/FlyerForms/AddShowForm';

export default function CreateFlyer(props) {

  const formLinks = [
    <MainNavLink to={'/create-flyer/show'} >Show (single event)</MainNavLink>,
    <MainNavLink to={'/create-flyer/fest'} >Fest (multiple events)</MainNavLink>,
    <MainNavLink to={'/create-flyer/tour'} >Tour (multiple events/locations)</MainNavLink>
  ]
  return(
    <div className="CreateFlyer">
      <MainHeader >
        Create Flyer
      </MainHeader>
      <MainNav
        links={formLinks}
      />
      <div className="Main--content">
        <Switch>
          <Route exact path='/create-flyer/show' component={AddShowForm}/>
        </Switch>

      </div>
    </div>
  )
}
