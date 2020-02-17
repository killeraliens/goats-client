import React from 'react'
// import PropTypes from 'prop-types'

const AppContext = React.createContext({
  user: {},
  updateAuthenticated: () => {},
  updateUser: () => {},
  error: null,
  setError: () => {}
})

export default AppContext
