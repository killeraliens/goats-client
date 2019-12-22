import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import config from './config';
import AppContext from './AppContext'

class LoginFB extends Component {
  constructor() {
    super()
    this.state = {
      error: null
    }
  }

  static contextType = AppContext

  logout = () => {
    this.context.updateAuthenticated(false, null)
  }

  facebookResponse = (response) => {
    console.log('FACEBOOKS CLIENT RESPONSE From button click', response)
    const tokenBlob = new Blob(
        [ JSON.stringify({access_token: response.accessToken}, null, 2) ],
        {type: 'application/json'}
    )

    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default'
    }
    console.log('FETCHING GOATS API, POST /api/v1/auth/facebook with token response')
    fetch(`${config.API_ENDPOINT}/api/v1/auth/facebook`, options)
      .then(resp => {
        if (!resp.ok) {
          return resp.json().then(error => Promise.reject(error))
        }
        const token = resp.headers.get('x-auth-token');
        resp.json().then(user => {
          if (token) {
            console.log('USER LOGGED IN, UPDATING USER CONTEXT to ', user)
            this.context.updateAuthenticated(true, user)
          }
        })
      })
      .catch(error => {
        console.log('LOGINFB AUTH ERROR', error)
      })
  }

  onFailure = (error) => { alert(error) }

  render() {
    let content = !!this.context.isAuthenticated ?
      (
        <div>
          <p>You're logged in</p>
          <div>
            {this.context.user.email}
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
