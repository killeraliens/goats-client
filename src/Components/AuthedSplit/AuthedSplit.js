import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AuthedContext from '../../AuthedContext';
import DUMMY from '../../DUMMY';
import Forum from '../Forum/Forum';
import Menu from '../Menu/Menu';
import Main from '../Main/Main';
import './AuthedSplit.css';

export default function AuthedSplit({ mainComponent }) {
  const [flyers, setFlyers] = useState([])
  const [events, setEvents] = useState([])
  const [users, setUsers] = useState([])
  const [fetching, setFetching] = useState(false)

  const updateUsers = (changedUser) => {
    let foundUser = users.find(user => user.id == changedUser.id)
    let updatedUser = {...foundUser, ...changedUser}
    let filteredUsers = users.filter(user => user.id.toString() !== changedUser.id.toString())
    const sets = new Promise ((res, rej) => {
      res(setUsers([...filteredUsers, {...updatedUser}]))
    })
    sets.then(() => console.log('updated users array', users))
  }

  const addFlyer = (flyer) => {
    console.log('flyers length', flyers.length)
    // const sets = new Promise((res, rej) => {
    // })
    let prevFlyers = flyers
    setFlyers([ ...prevFlyers, {...flyer} ])
    //sets.then(() => console.log('updated flyers length', flyers))
  }

  const addEvent = (event) => {
    console.log('events length', events.length)
    const sets = new Promise((res, rej) => {
      let prevEvents = events
      setEvents([...prevEvents, { ...event }])
    })
    sets.then(() => console.log('updated events length', events))
  }

  const contextValue = {
    flyers: flyers,
    addFlyer: addFlyer,
    events: events,
    addEvent: addEvent,
    users: users,
    fetching: fetching,
    updateUsers: updateUsers
  }
  useEffect(() => {
    const getAll = () => {
      setFetching(true)
      const flyersSet = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(setFlyers(DUMMY["flyers"]))
        }, 300);
      })
      const eventsSet = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(setEvents(DUMMY["events"]))
        }, 500);
      })
      const usersSet = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(setUsers(DUMMY["users"]))
        }, 100);
      })

      Promise.all([flyersSet, eventsSet, usersSet]).then(function (values) {
        setFetching(false)
      });
    }
    getAll()
  }, [])

  return(
    <div className="AuthedSplit">
      <Menu />
      <AuthedContext.Provider value={contextValue}>
        <Main component={React.cloneElement(mainComponent, {...contextValue} )}/>
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
