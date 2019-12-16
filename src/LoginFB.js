import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
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

  facebookResponse = (response) => {
    console.log(response)
    const tokenBlob = new Blob(
        [ JSON.stringify({access_token: response.accessToken}, null, 2) ],
        {type: 'application/json'}
    )
    //const tokenJSON = { access_token: response.accessToken }
    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default'
    }

    fetch(`${config.API_ENDPOINT}/api/v1/auth/facebook`, options)
      .then(resp => {
        //resp.headers.get('x-auth-token').then(r => console.log('HEADERS', r))
        if (!resp.ok) {
          return resp.json().then(error => Promise.reject(error))
        }
        const token = resp.headers.get('x-auth-token');
        resp.json().then(user => {
          if (token) {
            this.setState({
              user,
              isAuthenticated: true,
              token
            })
          }
        })
      })
      .catch(error => {
        console.log('LOGINFB AUTH ERROR', error)
      })
  }

  onFailure = (error) => { alert(error) }

  render() {
    console.log(this.state)
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
            callback={this.facebookResponse}
          />
        </div>
      );
    return (
      <div className="LoginFB">
        {content}
      </div>
    );
  }
}

export default LoginFB;
