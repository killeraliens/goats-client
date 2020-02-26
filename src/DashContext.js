import React from 'react'

const DashContext = React.createContext({
  flyers: [],
  deleteFlyerDash: () => {},
  updateFlyerDash: () => {}
})

export default DashContext
