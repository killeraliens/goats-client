import React, { useState, useEffect, useContext } from 'react';
import config from '../../config';
import PropTypes from 'prop-types';
import AuthedContext from '../../AuthedContext';
import AppContext from '../../AppContext';
//import DUMMY from '../../DUMMY';
import Forum from '../Forum/Forum';
import Menu from '../Menu/Menu';
import Main from '../Main/Main';
import './AuthedSplit.css';

export default function AuthedSplit({ mainComponent }) {
  const [flyers, setFlyers] = useState([])
  const [events, setEvents] = useState([])
  const [fetching, setFetching] = useState(false)
  const [serverError, setServerError] = useState('')
  const { user } = useContext(AppContext)
  const addFlyer = (flyer) => {
    setFlyers(prev => ([ ...prev, {...flyer}]))
  }

  const addEvent = (event) => {
    setEvents(prev => ([...prev, { ...event }]))
  }

  const contextValue = {
    flyers: flyers,
    addFlyer: addFlyer,
    events: events,
    addEvent: addEvent,
    fetching: fetching,
  }

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
      let eventsData = await fetchApiData("event")
      let flyersData = await fetchApiData("flyer")

      const flyersSet = new Promise((resolve, reject) => {
        resolve(setFlyers(flyersData))
      })
      const eventsSet = new Promise((resolve, reject) => {
        resolve(setEvents(eventsData))
      })

      Promise.all([flyersSet, eventsSet]).then(function (values) {
        setServerError('')
        setFetching(false)
      });
    }
    getAll()
  }, [])

  if (Boolean(serverError)) {
    return <p>{serverError}</p>
  }
  return(
    <div className="AuthedSplit">
      <Menu />
      <AuthedContext.Provider value={contextValue}>
        <Main component={React.cloneElement(mainComponent, { ...contextValue })} />
      </AuthedContext.Provider>
    </div>
  )
}

AuthedSplit.defaultProps = {
  mainComponent: <Forum />
}

AuthedSplit.propTypes = {
  mainComponent: PropTypes.objectOf(function (propValue, key, componentName, location, propFullName) {
    if (!["Dashboard", "Forum", "CreateFlyer"].includes(propValue.type.name)) {
      return new Error(`Bad component prop: ${propValue.type.name}. Pass one of the following: "Dashboard", "Forum", "CreateFlyer"`)
    }
  })
}
