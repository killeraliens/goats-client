import React from 'react'
// import PropTypes from 'prop-types'

const AppContext = React.createContext({
  events: [],
  addEvent: () => {},
  user: {},
  updateAuthenticated: () => {},
  updateUser: () => {}
})

export default AppContext
