import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import config from '../../../config';
import { Link, withRouter } from 'react-router-dom';
import ValidationError  from '../ValidationError/ValidationError';
import CentralContainer from '../../CentralContainer/CentralContainer';
import AppContext from '../../../AppContext';
import '../Forms.css';

function SignInForm(props) {
  const [username, setUsername] = useState({ value: '', touched: false, error: '' })
  const [password, setPassword] = useState({ value: '', touched: false, error: '' })
  const [serverError, setServerError] = useState(null)
  const context = useContext(AppContext)

  const resetForm = () => {
    setUsername({ value: '', touched: false, error: '' })
    setPassword({ value: '', touched: false, error: '' })
  }

  const updateValidationErrors = () => {
    setUsername(prev => ({ ...prev, error: validateUsername() }))
    setPassword(prev => ({ ...prev, error: validatePassword() }))
  }

  useEffect(() => {
    updateValidationErrors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverError])

  useEffect(() => {
    const clearServerErrors = () => {
      setServerError(null)
    }
    clearServerErrors()
  }, [username.value, password.value])

  const validateUsername = () => {
    if (username.touched) {
      const trimmedUsername = username.value.trim()
      return trimmedUsername.length === 0
      ? 'username required'
      : trimmedUsername.length < 4 || trimmedUsername.length > 12
      ? 'username must be between 4 and 12 characters long'
      : serverError && serverError.message && (/(username)|(exists)/.test(serverError.message))
      ? serverError.message
      : ''
    }
    return ''
  }

  const validatePassword = () => {
    if (password.touched) {
      const trimmedPassword = password.value.trim()
      return trimmedPassword.length === 0
        ? 'password required'
        : serverError && serverError.message && (/(password)|(match)/.test(serverError.message))
        ? serverError.message
        : ''
    }
    return ''
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    const postBody = {
      username: username.value,
      password: password.value
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(postBody),
      headers: {
        "Content-Type": "application/json",
      }
    }
    const response = await fetch(`${config.API_ENDPOINT}/api/auth/signin`, options)
    const body = await response.json();

    if (!response.ok) {
      setServerError(body)
      //alert(body.message)
      //context.updateAuthenticated(null)
    } else {
      resetForm()
      let user = body.token ? body : null
      context.updateAuthenticated(user)
      props.history.push(`/forum`)
    }
  }

  const required = "*"

  return(
    <CentralContainer>
      <form className="SignInForm" onSubmit={handleOnSubmit}>
        <h1>Sign In</h1>
        <p></p>
        <fieldset>
          <label htmlFor="username">Username{required}</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username.value || ''}
            onChange={e => setUsername({ value: e.target.value, touched: true})}
            aria-label="enter your username"
            aria-required="true"
            aria-describedby="usernameError"
            aria-invalid={!!username.error}
            onBlur={updateValidationErrors}
          />
          <ValidationError id="usernameError" message={username.error} />

        </fieldset>
        <fieldset>
          <label htmlFor="password">Password{required}</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password.value || ''}
            onChange={e => setPassword({ value: e.target.value, touched: true })}
            aria-label="enter your password"
            aria-required="true"
            aria-describedby="passwordError"
            aria-invalid={!!password.error}
            onBlur={updateValidationErrors}
          />
          <ValidationError id="passwordError" message={password.error} />
        </fieldset>
        <div className="form-controls">
          <button type="submit" disabled={username.error || password.error}>submit</button>
          <Link to="/public/signup">New Account</Link>
        </div>
      </form>
    </CentralContainer>
  );
}

SignInForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  })
}

export default withRouter(SignInForm);
