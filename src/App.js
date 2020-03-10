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
import GetFlyer from './Components/GetFlyer/GetFlyer'
import NotFound from './Components/NotFound/NotFound';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: JSON.parse(localStorage.getItem('user')) || null,
      error: null,
      fetching: false
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

  // not tested
  checkIsAuthed = async (user_id, token) => {
    this.setState({ fetching: true })
    const postBody = {
      user_id: user_id,
      token: token
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(postBody),
      headers: {
        "Content-Type": "application/json",
      }
    }
    const response = await fetch(`${config.API_ENDPOINT}/auth/check`, options)
    const body = await response.json();

    if (!response.ok) {
      this.setError(body)
      this.setState({ fetching: false })
      return false
    } else {
      this.setState({ fetching: false, error: null })
      return true
    }
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

      <div className="App scrollable" id="App" >
        <AppContext.Provider value={context}>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/public/:action" component={Landing}/>
              <PrivateRoute path={`/dashboard/:user_id`} render={props =>
                <ErrorBoundary>
                  <AuthedSplit mainComponent={<Dashboard {...props}/>} />
                </ErrorBoundary>
              } />
              <PrivateRoute path={`/fliers`} render={props =>
                <ErrorBoundary>
                  <AuthedSplit mainComponent={<Forum {...props}/>} />
                </ErrorBoundary>
              } />
              <PrivateRoute path={`/post`} render={props =>
                <ErrorBoundary>
                  <AuthedSplit mainComponent={<CreateFlyer {...props} />} />
                </ErrorBoundary>
              } />
              <PrivateRoute path={`/flier/:flyer_id/edit`} render={props =>
                <ErrorBoundary>
                  <AuthedSplit mainComponent={<GetFlyer isEdit={true} {...props} />} />
                </ErrorBoundary>
              } />
              <PrivateRoute path={`/flier/:flyer_id`} render={props =>
                <ErrorBoundary>
                  <AuthedSplit mainComponent={<GetFlyer {...props} />} />
                </ErrorBoundary>
              } />
              {/* <Route path='/' render={() =>
                !this.state.user || this.state.error
                  ? <Redirect to="/public/signin" /> //<NotFound link={<Link to="/public/signin">Sign In</Link>} />
                  : <Redirect to="/fliers" /> //<NotFound link={<Link to="/fliers">Back to forum</Link>} />
              } /> */}
              <Route render={() =>
              !this.state.user || (this.state.error && this.state.error.status == 401)
                  ? <Redirect to="/public/signin" /> // <NotFound link={<Link to="/public/signin">Sign In</Link>} />
                  : <Redirect to="/fliers" /> // <NotFound link={<Link to="/fliers">Back to forum</Link>} />
              } />
            </Switch>
        </ AppContext.Provider >
      </div>
    )
  }
}

export default App;
