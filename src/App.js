import React, {Component} from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import './App.css'
import config from './config.js'
import AppContext from './AppContext'
import PrivateRoute from './Components/PrivateRoute'
import Dashboard from './Components/Dashboard/Dashboard'
import Forum from './Components/Forum/Forum'
import Landing from './Components/Landing/Landing'
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

  render() {
    const context = {
      user: this.state.user,
      updateAuthenticated: this.updateAuthenticated,
      updateUser: this.updateUser
    }

    return(
      <div className="App">
        <AppContext.Provider value={context}>
          <Switch>
            <Route exact path="/public/:action" component={Landing}/>
            <PrivateRoute path={`/dashboard/:user_id`} render={props =>
              <AuthedSplit mainComponent={<Dashboard {...props}/>} />
            } />
            <PrivateRoute path={`/forum`} render={props =>
              <AuthedSplit mainComponent={<Forum {...props}/>} />
            } />
            <PrivateRoute path={`/create-flyer`} render={props =>
              <AuthedSplit mainComponent={<CreateFlyer {...props} />} />
            } />
            <Route path="/">
              {this.state.user ? <Redirect to="/public/signin" /> : <Landing />}
            </Route>
            <Route render={() => {
              return <NotFound link={<Link to="/forum">Back to forum</Link>} />
            }} />
          </Switch>
        </ AppContext.Provider >
      </div>
    )
  }
}

export default App;
