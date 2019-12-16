import React from 'react'
// import PropTypes from 'prop-types'

const AppContext = React.createContext({
  events: [],
  addEvent: () => {},
  user: {},
  isAuthenticated: false,
  updateUser: () => {}
  // router: PropTypes.object
})

export default AppContext
