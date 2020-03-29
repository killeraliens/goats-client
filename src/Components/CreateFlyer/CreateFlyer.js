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
import CentralContainer from '../CentralContainer/CentralContainer';

export default function CreateFlyer() {
  const { user } = useContext(AppContext)
  const formLinks = [
    <MainNavLink to={'/post/show'} isActive={(match, location) => {
      if (location.pathname === `/post/show` || location.pathname === `/post` || location.pathname === `/post/`) {
        return true
      }
      return false
    }}>Single Show</MainNavLink>,
    <MainNavLink to={'/post/tour'} >Tour</MainNavLink>,
    <MainNavLink to={'/post/fest'} >Festival</MainNavLink>
  ]

  return(
    <div className="CreateFlyer">
      <MainHeader >
        <Link to='/post' className='header-link' >
          Post
        </Link>
      </MainHeader>
      <MainNav
        links={formLinks}
      />
      <div className="Main--content">
        <CentralContainer>
          <Switch>
            <Route exact path='/post' render={({ history }) => {
              return <FlyerForm history={history} newType="Show" creatorId={user.id} />
            }} />
            <Route exact path='/post/show' render={({ history }) => {
              return <FlyerForm history={history} newType="Show" creatorId={user.id} />
            }}/>
            <Route path='/post/fest' render={({ history }) => {
              return <FlyerForm history={history} newType="Fest" creatorId={user.id} />
            }} />
            <Route path='/post/tour' render={({ history }) => {
              return <FlyerForm history={history} newType="Tour" creatorId={user.id} />
            }} />
            <Redirect to="/post" />
          </Switch>
          <BackLink hasArrow={true} backText={true} />

        </CentralContainer>
      </div>
    </div>
  )

}

