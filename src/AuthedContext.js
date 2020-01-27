import React from 'react'

const AuthedContext = React.createContext({
  events: [],
  addEvent: () => {},
  flyers: [],
  addFlyer: () => {},
  users: [],
  updateUser: () => {},
  fetching: false
})

export default AuthedContext
