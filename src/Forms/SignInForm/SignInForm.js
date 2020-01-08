import React, { useState, useContext, useEffect, useCallback } from 'react';
import config from '../../config'
import { Link, withRouter } from 'react-router-dom';
import ValidationError  from '../ValidationError/ValidationError'
import AppContext from '../../AppContext'

function SignInForm(props) {
  const [username, setUsername] = useState({ value: '', touched: false, error: '' })
  const [password, setPassword] = useState({ value: '', touched: false, error: '' })
  const [serverError, setServerError] = useState(null)
  const context = useContext(AppContext)

  const resetForm = () => {
    setUsername({ value: '', touched: false, error: '' })
    setPassword({ value: '', touched: false, error: '' })
  }

  // useEffect(() => {
  //   const updateValidationErrors = () => {
  //     setUsername(prev => ({ ...prev, error: validateUsername() }))
  //     setPassword(prev => ({ ...prev, error: validatePassword() }))
  //   }
  //   updateValidationErrors()
  // }, [serverError, username.error, password.error])

  const updateValidationErrors = () => {
    setUsername(prev => ({ ...prev, error: validateUsername() }))
    setPassword(prev => ({ ...prev, error: validatePassword() }))
  }

  useEffect(() => {
    updateValidationErrors()
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
      let user = body.token ? body : null
      context.updateAuthenticated(user)
      resetForm()
      props.history.push(`/profile/${user.id}`)
    }
  }


  const required = "*"

  return(
    <div>
      <form onSubmit={handleOnSubmit}>
        <div className="form-group">
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
            // onBlur={() => setUsername(prev => ({ ...prev, error: validateUsername() }))}
            onBlur={updateValidationErrors}
          />
          <ValidationError id="usernameError" message={username.error} />

        </div>
        <div className="form-group">
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
            // onBlur={() => setPassword(prev => ({ ...prev, error: validatePassword() }))}
            onBlur={updateValidationErrors}
          />
          <ValidationError id="passwordError" message={password.error} />
        </div>
        <button type="submit" disabled={username.error || password.error}>submit</button>
        <Link to="/signup">Sign Up</Link>
      </form>
    </div>
  );
}

export default withRouter(SignInForm);
