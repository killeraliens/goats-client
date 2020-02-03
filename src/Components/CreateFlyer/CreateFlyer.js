import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import AppContext from '../../AppContext';
import MainHeader from '../MainHeader/MainHeader';
import MainNav from '../MainNav/MainNav';
import MainNavLink from '../MainNavLink/MainNavLink';
import FlyerForm from '../Forms/FlyerForms/FlyerForm';


export default function CreateFlyer({ flyers, events, fetching}) {
  const context = useContext(AppContext)
  const formLinks = [
    <MainNavLink to={'/create-flyer/show'} >Single Show</MainNavLink>,
    <MainNavLink to={'/create-flyer/tour'} >Tour</MainNavLink>,
    <MainNavLink to={'/create-flyer/fest'} >Festival</MainNavLink>
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
          <Route exact path='/create-flyer/show' render={({ history }) => {
            return <FlyerForm history={history} newType="Show" creatorId={context.user.id} />
          }}/>
          <Route exact path='/create-flyer/fest' render={({ history }) => {
            return <FlyerForm history={history} newType="Fest" creatorId={context.user.id} />
          }} />
          <Route exact path='/create-flyer/tour' render={({ history }) => {
            return <FlyerForm history={history} newType="Tour" creatorId={context.user.id} />
          }} />
        </Switch>

      </div>
    </div>
  )
}

CreateFlyer.propTypes = {
  flyers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired,
    creator_id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired
  })),
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired,
    flyer_id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired
  })),
  // users: PropTypes.arrayOf(PropTypes.shape({
  //   id: PropTypes.oneOfType([
  //     PropTypes.number,
  //     PropTypes.string
  //   ]).isRequired
  // })),
  fetching: PropTypes.bool
}
