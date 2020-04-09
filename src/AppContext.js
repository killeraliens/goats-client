import React from 'react'
// import PropTypes from 'prop-types'

const AppContext = React.createContext({
  user: {},
  updateAuthenticated: () => {},
  updateUser: () => {},
  error: null,
  setError: () => {},
  toast: { on: false, message: '', colorClass: '' },
  setToast: () => {},
  fetching: false
})

export default AppContext
