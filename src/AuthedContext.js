import React from 'react'

const AuthedContext = React.createContext({
  events: [],
  addEvent: () => {},
  flyers: [],
  addFlyer: () => {},
  users: [],
  updateUsers: () => {},
  fetching: false
})

export default AuthedContext