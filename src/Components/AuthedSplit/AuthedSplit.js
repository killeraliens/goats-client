import React, { useState, useEffect, useContext } from 'react';
import config from '../../config';
import PropTypes from 'prop-types';
import AuthedContext from '../../AuthedContext';
import AppContext from '../../AppContext';
import Menu from '../Menu/Menu';
import Main from '../Main/Main';
import './AuthedSplit.css';

function sanitizeUser(user) {
  return {
    id: user.id,
    username: user.username,
    admin: user.admin,
    image_url: user.image_url,
    created: user.created,
    city_name: user.city_name,
    region_name: user.region_name,
    country_name: user.country_name,
    city_id: user.city_id
  }
}

export default function AuthedSplit({ mainComponent }) {
  const [flyers, setFlyers] = useState([])
  const [events, setEvents] = useState([])
  const [users, setUsers] = useState([])
  const [fetching, setFetching] = useState(false)
  const [serverError, setServerError] = useState('')
  const { user } = useContext(AppContext)

  const addFlyer = (flyer) => {
    setFlyers(prev => ([ ...prev, {...flyer}]))
  }

  const addEvents = (events) => {
    //setEvents(prev => ([...prev, { ...event }]))
    //let flyersPrevEvents = prev.filter(event => event.flyer_id === events[0])
    setEvents(prev => ([...prev, ...events]))
  }

  const updateUsers = (changedUser) => {
    let foundUser = users.find(user => user.id.toString() === changedUser.id.toString())
    let updatedUser;
    if (!foundUser) {
      updatedUser = { ...changedUser }
    } else {
      updatedUser = { ...foundUser, ...changedUser }
    }
    let filteredUsers = users.filter(user => user.id !== changedUser.id)
    setUsers([...filteredUsers, { ...sanitizeUser(updatedUser) }])
  }

  useEffect(() => {
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

    const getAll = async () => {
      setFetching(true)
      let eventsData = await fetchApiData("event")
      let flyersData = await fetchApiData("flyer")
      let usersData = await fetchApiData("user")

      const flyersSet = new Promise((resolve, reject) => {
        resolve(setFlyers(flyersData))
      })
      const eventsSet = new Promise((resolve, reject) => {
        resolve(setEvents(eventsData))
      })
      const usersSet = new Promise((resolve, reject) => {
        resolve(setUsers(usersData))
      })

      Promise.all([flyersSet, eventsSet, usersSet]).then((values) => {
        setServerError('')
        setFetching(false)
      });
    }
    getAll()
  }, [user.token])

  const contextValue = {
    flyers: flyers,
    addFlyer: addFlyer,
    events: events,
    addEvents: addEvents,
    fetching: fetching,
    users: users,
    updateUsers: updateUsers
  }

  if (Boolean(serverError)) {
    return <p>{serverError}</p>
  }
  return(
    <div className="AuthedSplit">
      <Menu />
      <AuthedContext.Provider value={contextValue}>
        <Main component={React.cloneElement(mainComponent, { flyers, events, users, fetching })} />
      </AuthedContext.Provider>
    </div>
  )
}

AuthedSplit.propTypes = {
  mainComponent: PropTypes.objectOf(function (propValue, key, componentName, location, propFullName) {
    if (!["Dashboard", "Forum", "CreateFlyer"].includes(propValue.type.name)) {
      return new Error(`Bad component prop: ${propValue.type.name}. Pass one of the following: "Dashboard", "Forum", "CreateFlyer"`)
    }
  })
}
