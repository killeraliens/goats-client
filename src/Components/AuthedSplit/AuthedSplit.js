import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import AuthedContext from '../../AuthedContext';
import AppContext from '../../AppContext'
import DUMMY from '../../DUMMY';
import Forum from '../Forum/Forum';
import Menu from '../Menu/Menu';
import Main from '../Main/Main';
import './AuthedSplit.css';
import App from '../../App';

export default function AuthedSplit({ mainComponent }) {
  const [flyers, setFlyers] = useState([])
  const [events, setEvents] = useState([])
  //const [users, setUsers] = useState([])
  //const contextUsers = useContext(AppContext).users
  //const [users, setUsers] = useState(contextUsers)
  //const users = useContext(AppContext).users
  //const updateUsers = useContext(AppContext).updateUsers
  const [fetching, setFetching] = useState(false)

  // useEffect(() => {
  //   const updateUsersPassedProps = () => {
  //     setUsers(contextUsers)
  //   }
  //   updateUsersPassedProps()
  // }, [contextUsers])

  // const updateUsers = (changedUser) => {
  //   let foundUser = users.find(user => user.id == changedUser.id)
  //   let updatedUser = {...foundUser, ...changedUser}
  //   let filteredUsers = users.filter(user => user.id.toString() !== changedUser.id.toString())
  //   const sets = new Promise ((res, rej) => {
  //     res(setUsers([...filteredUsers, {...updatedUser}]))
  //   })
  //   sets.then(() => console.log('updated users array', users))
  // }

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
    // users: AppContext.users,
    // updateUsers: AppContext.updateUsers
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
      // const usersSet = new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     resolve(setUsers(DUMMY["users"]))
      //   }, 100);
      // })

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
        {/* <Main component={React.cloneElement(mainComponent, {users, ...contextValue} )}/> */}
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
