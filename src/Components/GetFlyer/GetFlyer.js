import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter, Link } from 'react-router-dom';
import AppContext from '../../AppContext';
import MainHeader from '../MainHeader/MainHeader';
import FlyerForm from '../Forms/FlyerForms/FlyerForm';
import config from '../../config'
import Spinner from '../Spinner/Spinner';
import FlyerCard from '../FlyerCard/FlyerCard'
import BackLink from '../BackLink/BackLink'
import CentralContainer from '../CentralContainer/CentralContainer'
import NotFound from '../NotFound/NotFound'
import MainNav from '../MainNav/MainNav'
import MainNavLink from '../MainNavLink/MainNavLink'

function GetFlyer({ match, isEdit }) {
  const { user } = useContext(AppContext)
  const [fetching, setFetching] = useState(false)
  const [serverError, setServerError] = useState(null)
  const [ flyer, setFlyer ] = useState({})
  const formLinks = [
    <button 
      className='MainNavLink'
      onClick={() => setFlyer(prev => ({...prev, flyer_type: "Show"}))} 
    >
      Single Show
    </button>,
    <button
      className='MainNavLink'
      onClick={() => setFlyer(prev => ({...prev, flyer_type: "Fest"}))} 
    >
      Festival
    </button>,
    <button
    className='MainNavLink'
    onClick={() => setFlyer(prev => ({...prev, flyer_type: "Tour"}))} 
  >
    Tour
  </button>,
  ]

 //on mount call api for flyer
  useEffect(() => {
    const myAbortController = new AbortController();
    const getFlyer = async () => {
      setFetching(true)
      const options = {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        signal: myAbortController.signal
      }
      try {
        const response = await fetch(`${config.API_ENDPOINT}/flyer/${match.params.flyer_id}`, options);
        const body = await response.json()
        if (!response.ok) {
          setServerError({ status: response.status, message: body.message })
          setFetching(false)
        } else {
          setServerError(null)
          setFlyer(body)
          setFetching(false)
        }
      } catch (e) {
        if (!myAbortController.signal.aborted) {
          //setServerError({ status: e.status, message: e.message })
          setFetching(false)
        }
      }
    }
    getFlyer()

    return () => {
      // console.log('cleaned up')
      myAbortController.abort();
    }
  }, [match])


  const isAuthed = ((user && user.id) && (user.id === flyer.creator_id)) || (user && user.admin)

  switch (true) {
    case fetching:
      return <Spinner />

    case !!serverError && serverError.status === 401:
      return (
        <NotFound
          message="Session expired"
          isFetching={fetching}
          link={<Link to='/public/signin' >Sign In</Link>} />
      )

    case flyer.id && !isEdit :
      return (
        <div className="GetFlyer ViewFlyer">
          <MainHeader >
            <BackLink className='header-link'>
              {flyer.headline}
            </BackLink>
          </MainHeader>
          <div className="Main--content">
            <FlyerCard flyer={flyer} isEdit={false} />
            <BackLink backText={true} hasArrow={true} />
          </div>
        </div>
      )

    case flyer.id && isEdit && !isAuthed:
      return <Redirect to='/flyers' />

    case flyer.id && isEdit && isAuthed:
      return (
        <div className="GetFlyer EditFlyer">
          <MainHeader >
            <BackLink className='header-link'>
              Edit{' '}{flyer.headline}
            </BackLink>
          </MainHeader>
          <MainNav
            links={formLinks}
          />
          <div className="Main--content">
            <CentralContainer>
              <FlyerForm flyer={flyer} />
              <BackLink backText={true} hasArrow={true}/>
            </CentralContainer>
          </div>
        </div>
      )

    default:
      return null
  }
}

export default withRouter(GetFlyer)

GetFlyer.defaultProps = {
  isEdit: false
}

GetFlyer.propTypes = {
  match: PropTypes.object,
  isEdit: PropTypes.bool
}
