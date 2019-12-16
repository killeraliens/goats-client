import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import config from './config';

class LoginFB extends Component {
  constructor() {
    super()
    this.state = {
      isAuthenticated: false,
      token: '',
      user: null,
      error: null
    }
  }

  logout = () => {
    this.setState({
      isAuthenticated: false,
      token: '',
      user: null
    })
  }

  facebookResponse = (e) => { }

  onFailure = (error) => { alert(error) }

  render() {
    let content = !!this.state.isAuthenticated ?
      (
        <div>
          <p>Authenticated</p>
          <div>
            {this.state.user.email}
          </div>
          <div>
            <button onClick={this.logout} className="button">
              Log out
            </button>
          </div>
        </div>
      ) :
      (
        <div>
          <FacebookLogin
            appId={config.FB_APP_ID}
            autoLoad={false}
            fields="name,email,picture"
            callback={this.facebookResponse} />
        </div>
      );
     console.log(config.APP_SECRET)
    return (
      <div className="LoginFB">
        {content}
      </div>
    );
  }
}

export default LoginFB;
