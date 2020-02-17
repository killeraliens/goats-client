import React from 'react'
// import PropTypes from 'prop-types'

const AppContext = React.createContext({
  user: {},
  updateAuthenticated: () => {},
  updateUser: () => {},
  serverError: null,
  setServerError: () => {}
})

export default AppContext
