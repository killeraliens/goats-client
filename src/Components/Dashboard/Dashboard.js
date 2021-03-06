import React, { useContext, useState, useEffect } from 'react'
import AppContext from '../../AppContext'
import DashContext from '../../DashContext'
import PropTypes from 'prop-types'
import { Switch, Route, Link } from 'react-router-dom'
import MainHeaderNav from '../MainHeaderNav/MainHeaderNav'
import MainNavLink from '../MainNavLink/MainNavLink'
import SignOutLink from '../SignOutLink/SignOutLink'
import EditProfileForm from '../Forms/EditProfileForm/EditProfileForm'
import Profile from '../Profile/Profile'
import './Dashboard.css'
import NotFound from '../NotFound/NotFound'
import Spinner from '../Spinner/Spinner'
import config from '../../config'
import SettingsMenu from '../SettingsMenu/SettingsMenu'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Dashboard({ match }) {
  const { user } = useContext(AppContext)
  const paramsId = match.params.user_id
  const [flyers, setFlyers] = useState([])
  const [fetching, setFetching] = useState(false)
  const [serverError, setServerError] = useState(null)
  const [foundUser, setFoundUser] = useState(null)

  useEffect(() => {
    const abortController = new AbortController();

    const fetchApiData = async () => {
      setFetching(true)
      setServerError(null)
      const options = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        signal: abortController.signal
      }

      try {
        const response = await fetch(`${config.API_ENDPOINT}/flyer?creator=${paramsId}`, options);
        const body = await response.json();
        if (!response.ok) {
          setServerError({ status: response.status, message: body.message })
          setFetching(false)
        } else {
          setFoundUser(body.creator)
          setFlyers(body.flyers)
          setFetching(false)
        }
      } catch (e) {
        if (!abortController.signal.aborted) {
          console.log('fetch aborted', e)
          setFetching(false)
        }
      }
    }

    fetchApiData()
    return () => {
      abortController.abort()
    }
  }, [match.url, user])

  const deleteFlyer = (flyerId) => {
    setFlyers(prev => ([...prev.filter(flyer => flyer.id !== flyerId)]))
  }

  const updateFlyer = (flyerId) => {
    console.log('edit flyer clicked on', flyerId)
  }

  const contextValue = {
    flyers: flyers,
    deleteFlyerDash: deleteFlyer,
    updateFlyerDash: updateFlyer
  }

  switch (true) {

    case fetching:
      return <Spinner />


    case !!serverError && serverError.status === 401:
      return (
          <NotFound
            message="Session expired"
            isFetching={fetching}
            link={<Link to='/public/signin' >Sign In</Link>}/>
      )

    case !!serverError && serverError.status === 404:
      return (
        <NotFound
          message="User doesn't exist"
          isFetching={fetching} />
      )

    case foundUser && user && user.id === paramsId:
      return (
        <div className="Dashboard">
          <DashContext.Provider value={contextValue}>
            <MainHeaderNav links={[
              <MainNavLink
                to={`/dashboard/${foundUser.id}/edit`}
              >
                Edit Profile
              </MainNavLink>,
              <SignOutLink />,
              <MainNavLink
                to={`/dashboard/${foundUser.id}/settings`}
                isActive={() => false}
              >
                {' '}<FontAwesomeIcon icon={faCog}/>{' '}Settings
              </MainNavLink>
            ]} />
            <Switch>
              <Route exact path={`/dashboard/${foundUser.id}/edit`} render={({ history }) => {
                return <EditProfileForm history={history} />
              }} />
              <Route path={`/dashboard/${foundUser.id}/settings`} render={({ history }) => {
                return <SettingsMenu history={history} user={foundUser}/>
              }}/>
              <Route path={`/dashboard/${foundUser.id}`} render={() => {
                return <Profile user={foundUser} isCurrent={true} userFlyers={flyers} fetching={fetching} />
              }} />
            </Switch>
          </DashContext.Provider>
          </div>
      )
    case !!foundUser:
        return (
          <div className="Dashboard">
            <DashContext.Provider value={contextValue}>
              <Profile user={foundUser} isCurrent={false} userFlyers={flyers} fetching={fetching} />
            </DashContext.Provider>
            {/* <div className='backlink-container'>
              <BackLink backText={true} hasArrow={true} />
            </div> */}
          </div>
        )
    default:
      return null
  }
}

Dashboard.defaultProps = {
  match: { params: {} },
  fetching: false
}

Dashboard.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  })
}

export default Dashboard
