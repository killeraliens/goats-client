import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import AppContext from '../../AppContext';
// import AuthedContext from '../../AuthedContext';
import MainHeader from '../MainHeader/MainHeader';
// import MainNav from '../MainNav/MainNav';
// import MainNavLink from '../MainNavLink/MainNavLink';
import FlyerForm from '../Forms/FlyerForms/FlyerForm';
//import NotFound from '../NotFound/NotFound'
import config from '../../config'
import Spinner from '../Spinner/Spinner';

export default function EditFlyer({ match }) {
  const { user, setError } = useContext(AppContext)
  const [fetching, setFetching] = useState(false)
  const [serverError, setServerError] = useState(null)
  const [ flyer, setFlyer ] = useState({})

  //console.log('Edit flyer props', match)
  // const formLinks = [
  //   <MainNavLink to={'/create-flyer/show'} >Single Show</MainNavLink>,
  //   <MainNavLink to={'/create-flyer/tour'} >Tour</MainNavLink>,
  //   <MainNavLink to={'/create-flyer/fest'} >Festival</MainNavLink>
  // ]

 //on mount call api for flyer
  useEffect(() => {
    const getFlyer = async () => {
      setFetching(true)
      const options = {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
      }
      const response = await fetch(`${config.API_ENDPOINT}/flyer/${match.params.flyer_id}`, options);
      const body = await response.json()
      if (!response.ok) {
        setServerError({ status: response.status, message: body.message })
        setFetching(false)
      } else {
        setServerError(null)
        setFlyer(body)
        setFetching(false)
      // updateFlyer(flyerId)
      // updateFlyerDash(flyerId)
      }
    }
    getFlyer()
  }, [match])

  switch (true) {
    case fetching:
      return <Spinner />
    // case !!serverError && serverError.status === 401:
    case !!serverError && serverError.status === 401:
      setError(serverError)
      // return (
      //   <div className="EditFlyer">
      //     <NotFound
      //       message="Session expired"
      //       isFetching={fetching}
      //       link={<Link to='/public/signin' >Sign In</Link>}
      //     />
      //   </div>
      // )

    default:
      return (
        <div className="EditFlyer">
          <MainHeader >
            {/* <Link to='/create-flyer/show' className='header-link'> */}
              Edit Flyer
            {/* </Link> */}
          </MainHeader>
          {/* <MainNav
            links={formLinks}
          /> */}
          <div className="Main--content">
            <FlyerForm flyer={flyer} />
            {/* <Switch>
              <Route exact path='/create-flyer/show' render={({ history }) => {
                return <FlyerForm history={history} newType="Show" creatorId={user.id} />
              }} />
              <Route path='/create-flyer/fest' render={({ history }) => {
                return <FlyerForm history={history} newType="Fest" creatorId={user.id} />
              }} />
              <Route path='/create-flyer/tour' render={({ history }) => {
                return <FlyerForm history={history} newType="Tour" creatorId={user.id} />
              }} />
              <Redirect to="/create-flyer" />
            </Switch> */}
          </div>
        </div>
      )
  }
}
