import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AuthedContext from '../../AuthedContext';
import DUMMY from '../../DUMMY';
import Forum from '../Forum/Forum';
import Menu from '../Menu/Menu';
import Main from '../Main/Main';
// import Spinner from '../Spinner/Spinner';
import './AuthedSplit.css';

export default function AuthedSplit({ mainComponent }) {
  // MENTOR QUESTION: should i contain the setting of 'flyers', 'events', 'users' state to the Feed component, and just pass a 'params' prop to filter?
  // I could send my back end the query or filter "all" here in react.
  // feed changes depending on where it loads (in dashboard it will pull up the users flyers), on here, it will change based on search/nav link params
  const [flyers, setFlyers] = useState([])
  const [events, setEvents] = useState([])
  const [users, setUsers] = useState([])
  const [fetching, setFetching] = useState(false)
  // const context = useContext(AuthedContext)
  const updateUsers = (changedUser) => {
    console.log('changed user', changedUser)
    let foundUser = users.find(user => user.id == changedUser.id)
    console.log('found user', foundUser)
    let updatedUser = {...foundUser, ...changedUser}
    let filteredUsers = users.filter(user => user.id.toString() !== changedUser.id.toString())
    const sets = new Promise ((res, rej) => {
      console.log('updating context/state of users', [...filteredUsers, { ...updatedUser }])
      res(setUsers([...filteredUsers, {...updatedUser}]))
    })
    sets.then(() => console.log('updated users array', users))
  }



  const contextValue = {
    flyers: flyers,
    events: events,
    users: users,
    fetching: fetching,
    updateUsers: updateUsers
  }
  useEffect(() => {
    const getAll = () => {
      console.log('fetching flyers, events..')

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
      // setFetching(false)
      // setTimeout(() => {
      //   setFetching(false)
        // MENTOR QUESTION: how to handle multiple requests - with Promise.all ?
        // the changing of passed props is making my child component rerender mulitiple times
        // setFlyers(DUMMY["flyers"])
        // setEvents(DUMMY["events"])
        // setUsers(DUMMY["users"])
      // }, 500);
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
