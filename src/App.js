import React, { useState, useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import './App.css'
import AppContext from './AppContext'
import PrivateRoute from './Components/PrivateRoute'
import Dashboard from './Components/Dashboard/Dashboard'
import Forum from './Components/Forum/Forum'
import Landing from './Components/Landing/Landing'
import ErrorBoundary from './Components/ErrorBoundary'
import AuthedSplit from './Components/AuthedSplit/AuthedSplit'
import CreateFlyer from './Components/CreateFlyer/CreateFlyer'
import GetFlyer from './Components/GetFlyer/GetFlyer'
import KillerToast from './Components/KillerToast/KillerToast'

const App = () => {

  const [auth, setAuth] = useState({
    user: JSON.parse(localStorage.getItem("user")) || null,
    error: null,
    fetching: false,
    toast: { on: false, message: '', colorClass: '' }
  })

  const updateAuthenticated = (user) => {
    setAuth((prevState) => ({
      ...prevState,
      user: user
    }))
  }

  const updateUser = (newProps) => {
    setAuth((prevState) => ({
      ...prevState,
      user: {...auth.user, ...newProps}
    }))
  }

  const setError = (message) => {
    setAuth((prevState) => ({...prevState, error: message }))
  }

  const setToast = ({ message, colorClass, timeout: timeout=1500 }) => {
    setTimeout(() => {
      setAuth((prevState) => ({...prevState, toast: { on: true, message: message, colorClass: colorClass }}))
    }, 200);
    setTimeout(() => {
      setAuth((prevState) => ({...prevState, toast: { on: false, message: '', colorClass: '' }}))
    }, timeout);
  }

  const history = useHistory();
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(auth.user))
    !user ? history.push("/public/signin") : history.push("/flyers")
  }, [auth.user])

  const context = {
    user: auth.user,
    updateAuthenticated: updateAuthenticated,
    updateUser: updateUser,
    error: auth.error,
    setError: setError,
    toast: auth.toast,
    setToast: setToast,
    fetching: auth.fetching
  }

  const { toast, user } = auth

  return (
    <div className="App" id="App" >
      <AppContext.Provider value={context}>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/public/:action" component={Landing}/>
          <PrivateRoute path={`/dashboard/:user_id`} render={props =>
            <ErrorBoundary>
              <AuthedSplit mainComponent={<Dashboard {...props}/>} />
            </ErrorBoundary>
          } />
          <PrivateRoute path={`/flyers`} render={props =>
            <ErrorBoundary>
              <AuthedSplit mainComponent={<Forum {...props}/>} />
            </ErrorBoundary>
          } />
          <PrivateRoute path={`/post`} render={props =>
            <ErrorBoundary>
              <AuthedSplit mainComponent={<CreateFlyer {...props} />} />
            </ErrorBoundary>
          } />
          <PrivateRoute path={`/flyer/:flyer_id/edit`} render={props =>
            <ErrorBoundary>
              <AuthedSplit mainComponent={<GetFlyer isEdit={true} {...props} />} />
            </ErrorBoundary>
          } />
          <PrivateRoute path={`/flyer/:flyer_id`} render={props =>
            <ErrorBoundary>
              <AuthedSplit mainComponent={<GetFlyer {...props} />} />
            </ErrorBoundary>
          } />
        </Switch>
            <KillerToast on={toast.on} message={toast.message} colorClass={toast.colorClass}/>
      </AppContext.Provider>
    </div>
  );
};

export default App;
