import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../../AppContext';
import AuthedContext from '../../AuthedContext';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import MainHeaderNav from '../MainHeaderNav/MainHeaderNav';
import MainNavLink from '../MainNavLink/MainNavLink';
import SignOutLink from '../SignOutLink/SignOutLink';
import EditProfileForm from '../Forms/EditProfileForm/EditProfileForm';
import Profile from '../Profile/Profile';
import './Dashboard.css'
import NotFound from '../NotFound/NotFound';
import Spinner from '../Spinner/Spinner';
import config from '../../config'

function Dashboard({ match }) {
  const { user } = useContext(AppContext)
  const paramsId = match.params.user_id
  //const { flyers, events, users, fetching } = useContext(AuthedContext)
  const { events, users } = useContext(AuthedContext)
  const [flyers, setFlyers] = useState([])
  const [fetching, setFetching] = useState(false)
  const [serverError, setServerError] = useState('')
  const [foundUser, setFoundUser] = useState(null)

  //const foundUser = users.find(user => user.id === paramsId);
  //const userFlyers = foundUser
    // ? flyers.filter(flyer => flyer.creator_id === foundUser.id)
    // : []

  const fetchApiData = async (type) => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      }
    }
    const response = await fetch(`${config.API_ENDPOINT}/${type}`, options);
    const body = await response.json();
    if (!response.ok) {
      setServerError(body.message)
    }
    return body
  }

  useEffect(() => {

    const getAll = async () => {
      setFetching(true)
      //const eventsData = await fetchApiData("event")
      const flyersData = await fetchApiData(`flyer?creator=${paramsId}`)
      // const usersData = await fetchApiData("user")
      console.log(flyersData)
      const flyersSet = new Promise((resolve, reject) => {
        setFoundUser(flyersData.creator)
        resolve(setFlyers(flyersData.flyers))
      })
      // const eventsSet = new Promise((resolve, reject) => {
      //   resolve(setEvents(eventsData))
      // })
      // const paramsIdUserSet = new Promise((resolve, reject) => {
      //   resolve(setUsers(usersData))
      // })

      Promise.all([flyersSet]).then((values) => {
        setServerError('')
        setFetching(false)
      });
    }
    getAll()
  }, [match])
  // const publicFlyers = userFlyers.filter(flyer => flyer.listing_state === "Public")
  //const draftFlyers = userFlyers.filter(flyer => flyer.listing_state === "Draft")
  if (fetching) {
    return (
      <div className="Dashboard">
        <Spinner />
      </div>
    )
  }
  if (foundUser && user && user.id === paramsId) {
    return(
      <div className="Dashboard">
        <MainHeaderNav links={[
          <MainNavLink to={`/dashboard/${foundUser.id}/edit`}>Edit Profile</MainNavLink>,
          <SignOutLink />
        ]}/>
        <Switch>
          <Route exact path={`/dashboard/${foundUser.id}/edit`} render={({ history }) => {
            return <EditProfileForm history={history}/>
          }}/>
          <Route path={`/dashboard/${foundUser.id}`} render={() => {
            return <Profile user={foundUser} isCurrent={true} userFlyers={flyers} events={events} users={users} fetching={fetching} />
          }} />
        </Switch>
      </div>
    )
  }
  if(foundUser) {
    return (
      <div className="Dashboard">
        <Profile user={foundUser} isCurrent={false} userFlyers={flyers} events={events} users={users} fetching={fetching} />
      </div>
    )
  }
  return (
    <div className="Dashboard">
      <NotFound message="User doesn't exist" />
    </div>
  )
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
