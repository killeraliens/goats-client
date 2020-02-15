import React from 'react'

const AuthedContext = React.createContext({
  flyers: [],
  addFlyer: () => {},
  deleteFlyer: () => {},
  events: [],
  addEvents: () => {},
  users: [],
  updateUsers: () => {},
  fetching: false,
  fetchingAdditional: false,
  total: 0,
  handleClickLoad: () => {}
})

export default AuthedContext
