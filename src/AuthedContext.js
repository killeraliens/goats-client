import React from 'react'

const AuthedContext = React.createContext({
  flyers: [],
  addFlyer: () => {},
  deleteFlyer: () => {},
  updateFlyer: () => {},
  fetching: false,
  fetchingAdditional: false,
  total: 0,
  handleClickLoad: () => {},
  serverError: null
})

export default AuthedContext
