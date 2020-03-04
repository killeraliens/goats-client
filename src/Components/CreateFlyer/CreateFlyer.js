import React, { useContext } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import AppContext from '../../AppContext';
import AuthedContext from '../../AuthedContext';
import MainHeader from '../MainHeader/MainHeader';
import MainNav from '../MainNav/MainNav';
import MainNavLink from '../MainNavLink/MainNavLink';
import FlyerForm from '../Forms/FlyerForms/FlyerForm';
import NotFound from '../NotFound/NotFound'
import BackLink from '../BackLink/BackLink'

export default function CreateFlyer() {
  const { user, error } = useContext(AppContext)
  const { serverError, fetching } = useContext(AuthedContext)
  const formLinks = [
    <MainNavLink to={'/create-flyer/show'} >Single Show</MainNavLink>,
    <MainNavLink to={'/create-flyer/tour'} >Tour</MainNavLink>,
    <MainNavLink to={'/create-flyer/fest'} >Festival</MainNavLink>
  ]

  switch (true) {

    // case !!serverError && serverError.status === 401:
    case !!error && error.status === 401:

    return (
      <div className="CreateFlyer">
        <NotFound
          message="Session expired"
          isFetching={fetching}
          link={<Link to='/public/signin' >Sign In</Link>}
        />
      </div>
    )

    default:
      return(
        <div className="CreateFlyer">
          <MainHeader >
            <BackLink className='header-link' >
              Post
            </BackLink>
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
          <div className='backlink-container'>
            <BackLink backText={true} hasArrow={true} />
          </div>
        </div>
      )
  }
}

