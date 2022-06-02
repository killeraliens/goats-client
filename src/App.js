import React, {Component} from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
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

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: JSON.parse(localStorage.getItem('user')) || null,
      error: null,
      fetching: false,
      toast: { on: false, message: '', colorClass: '' }
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

  setError = (message) => {
    this.setState({ error: message })
  }

  setToast = ({ message, colorClass, timeout: timeout=1500 }) => {
    setTimeout(() => {
      this.setState({ toast: { on: true, message: message, colorClass: colorClass }})
    }, 200);
    setTimeout(() => {
      this.setState({ toast: { on: false, message: '', colorClass: '' }})
    }, timeout);
  }

  render() {
    const context = {
      user: this.state.user,
      updateAuthenticated: this.updateAuthenticated,
      updateUser: this.updateUser,
      error: this.state.error,
      setError: this.setError,
      toast: this.state.toast,
      setToast: this.setToast,
      fetching: this.state.fetching
    }

    const { toast, user } = this.state
    return(
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
            <Route render={() => {
              return !user
                    ? <Redirect to="/public/signin" /> // <NotFound link={<Link to="/public/signin">Sign In</Link>} />
                    : <Redirect to="/flyers" /> // <NotFound link={<Link to="/flyers">Back to forum</Link>} />
                }
              } />
            <KillerToast on={toast.on} message={toast.message} colorClass={toast.colorClass}/>
        </ AppContext.Provider >
      </div>
    )
  }
}

export default App;
