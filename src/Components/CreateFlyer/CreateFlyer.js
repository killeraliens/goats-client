import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import AppContext from '../../AppContext';
import MainHeader from '../MainHeader/MainHeader';
import MainNav from '../MainNav/MainNav';
import MainNavLink from '../MainNavLink/MainNavLink';
import FlyerForm from '../Forms/FlyerForms/FlyerForm';
import NotFound from '../NotFound/NotFound'


export default function CreateFlyer() {
  const { user, error } = useContext(AppContext)
  const formLinks = [
    <MainNavLink to={'/create-flyer/show'} >Single Show</MainNavLink>,
    <MainNavLink to={'/create-flyer/tour'} >Tour</MainNavLink>,
    <MainNavLink to={'/create-flyer/fest'} >Festival</MainNavLink>
  ]

  if (Boolean(error) && (/(authorized|Unauthorized)/.test(error))) {
    return (
      <NotFound
        message={`Session expired.`}
        link={<Link to='/public/signin'>Sign in</Link>}
      />
    )
  }
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
          <Route exact path='/create-flyer/show' render={({ history }) => {
            return <FlyerForm history={history} newType="Show" creatorId={user.id} />
          }}/>
          <Route path='/create-flyer/fest' render={({ history }) => {
            return <FlyerForm history={history} newType="Fest" creatorId={user.id} />
          }} />
          <Route path='/create-flyer/tour' render={({ history }) => {
            return <FlyerForm history={history} newType="Tour" creatorId={user.id} />
          }} />
          <Redirect to="/create-flyer" />
        </Switch>

      </div>
    </div>
  )
}
