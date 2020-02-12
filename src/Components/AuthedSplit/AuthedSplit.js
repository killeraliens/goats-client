import React, { useState, useEffect, useContext } from 'react';
import config from '../../config';
import PropTypes from 'prop-types';
import AuthedContext from '../../AuthedContext';
//import DUMMY from '../../DUMMY';
import Forum from '../Forum/Forum';
import Menu from '../Menu/Menu';
import Main from '../Main/Main';
import './AuthedSplit.css';

export default function AuthedSplit({ mainComponent }) {
  const [flyers, setFlyers] = useState([])
  const [events, setEvents] = useState([])
  const [fetching, setFetching] = useState(false)


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
    const response = await fetch(`${config.API_ENDPOINT}/${type}`);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }

    return body
  }

  useEffect(() => {
    const getAll = () => {
      setFetching(true)

      const flyersSet = new Promise((resolve, reject) => {
        resolve(setFlyers(DUMMY["flyers"]))
        // setTimeout(() => {
        //   resolve(setFlyers(DUMMY["flyers"]))
        // }, 300);
      })
      const eventsSet = new Promise((resolve, reject) => {
        resolve(setEvents(DUMMY["events"]))
        // setTimeout(() => {
        //   resolve(setEvents(DUMMY["events"]))
        // }, 500);
      })

      Promise.all([flyersSet, eventsSet]).then(function (values) {
        setFetching(false)
      });
    }
    getAll()
  }, [])

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
