import React, {Component} from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import './App.css'
import config from './config.js'
import AppContext from './AppContext'
import PrivateRoute from './Components/PrivateRoute'
import Dashboard from './Components/Dashboard/Dashboard'
import Forum from './Components/Forum/Forum'
import Landing from './Components/Landing/Landing'
import ErrorBoundary from './Components/ErrorBoundary'
import AuthedSplit from './Components/AuthedSplit/AuthedSplit';
import CreateFlyer from './Components/CreateFlyer/CreateFlyer';
import NotFound from './Components/NotFound/NotFound';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: JSON.parse(localStorage.getItem('user')) || null,
      error: null
    }
  }

  updateAuthenticated = (user) => {
    this.setState({
      user
    }, () => {
      localStorage.setItem("user", JSON.stringify(this.state.user))
    })
  }

  updateUser = (newProps) => {
    this.setState({
      user: {...this.state.user, ...newProps}
    }, () => {
      localStorage.setItem("user", JSON.stringify(this.state.user))
    })
  }

  destroyCurrentLoginState = () => {
    this.updateAuthenticated(null)
  }

  setError = (serverError) => {
    this.setState({ error: serverError })
  }

  render() {
    const context = {
      user: this.state.user,
      updateAuthenticated: this.updateAuthenticated,
      updateUser: this.updateUser,
      error: this.state.error,
      setError: this.setError
    }

    return(
      <div className="App">
        <AppContext.Provider value={context}>
          <ErrorBoundary>
            <Switch>
              <Route exact path="/public/:action" component={Landing}/>
              <PrivateRoute path={`/dashboard/:user_id`} render={props =>
                <ErrorBoundary>
                  <AuthedSplit mainComponent={<Dashboard {...props}/>} />
                </ErrorBoundary>
              } />
              <PrivateRoute path={`/forum`} render={props =>
                <ErrorBoundary>
                  <AuthedSplit mainComponent={<Forum {...props}/>} />
                </ErrorBoundary>
              } />
              <PrivateRoute path={`/create-flyer`} render={props =>
                <ErrorBoundary>
                  <AuthedSplit mainComponent={<CreateFlyer {...props} />} />
                </ErrorBoundary>
              } />
              <Route render={() =>
                !this.state.user || this.state.error
                  ? <NotFound link={<Link to="/public/signin">Sign In</Link>} />  //<Redirect to="/public/signin" />
                  : <NotFound link={<Link to="/forum">Back to forum</Link>} />   // <Redirect to="/forum" />
              } />
            </Switch>
          </ErrorBoundary>
        </ AppContext.Provider >
      </div>
    )
  }
}

export default App;
