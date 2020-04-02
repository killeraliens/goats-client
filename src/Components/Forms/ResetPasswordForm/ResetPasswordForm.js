import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import config from '../../../config';
import { Link, withRouter } from 'react-router-dom';
import ValidationError from '../ValidationError/ValidationError';
import CentralContainer from '../../CentralContainer/CentralContainer';
import AppContext from '../../../AppContext';
import Spinner from '../../Spinner/Spinner';
import '../Forms.css';

function ResetPasswordForm({ history, token }) {
  const [username, setUsername] = useState({ value: '', touched: false, error: '' })
  const [password, setPassword] = useState({ value: '', touched: false, error: '' })
  const [repeatPassword, setRepeatPassword] = useState({ value: '', touched: false, error: '' })
  const [fetching, setFetching] = useState(false)
  const [serverError, setServerError] = useState(null)
  const context = useContext(AppContext)

  const resetForm = () => {
    setUsername({ value: '', touched: false, error: '' })
    setPassword({ value: '', touched: false, error: '' }),
    setRepeatPassword({ value: '', touched: false, error: '' })
  }

  const updateValidationErrors = () => {
    setUsername(prev => ({ ...prev, error: validateUsername() }))
    setPassword(prev => ({ ...prev, error: validatePassword() }))
    setRepeatPassword(prev => ({ ...prev, error: validateRepeatPassword() }))
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
  }, [username.value, password.value, repeatPassword.value])

  const validateUsername = () => {
    if (username.touched) {
      const trimmedUsername = username.value.trim()
      return trimmedUsername.length === 0
        ? 'username required'
        : ''
    }
    return ''
  }

  const validatePassword = () => {
    if (password.touched) {
      const trimmedPassword = password.value.trim()
      return trimmedPassword.length === 0
        ? 'password required'
        : password.length < 5 || password.length > 12
          ? 'password must be between 5 and 12 characters long'
          : !(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(password))
            ? 'password must have at least one letter and one number, no special characters'
            : ''
    }
    return ''
  }

  const validateRepeatPassword = () => {
    if (repeatPassword.touched) {
      const trimmedRepeatPassword = repeatPassword.value.trim()
      return trimmedRepeatPassword.length === 0
        ? 'password required'
        : trimmedRepeatPassword.length < 5 || trimmedRepeatPassword.length > 12
          ? 'password must be between 5 and 12 characters long'
          : !(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(trimmedRepeatPassword))
            ? 'password must have at least one letter and one number, no special characters'
            : ''
    }
    return ''
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setFetching(true)
    const postBody = {
      username: username.value,
      new_password: password.value
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(postBody),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }

    try {
      const response = await fetch(`${config.API_ENDPOINT}/auth/reset`, options)
      const body = await response.json();
      if (!response.ok) {
        setServerError({ status: response.status, message: body.message })
        setFetching(false)
      } else {
        setFetching(false)
        resetForm()
        let user = body.token ? body : null
        context.updateAuthenticated(user)
        history.push(`/fliers`)
      }
    } catch (err) {
      setServerError({ message: err.message })
      setFetching(false)
    }
  }

  const required = "*"
  if (fetching) {
    return <Spinner />
  }

  return (
    <CentralContainer>
      <form className="ResetPasswordForm" onSubmit={handleOnSubmit}>
        <h1>Reset Password</h1>
        <p></p>
        <fieldset>
          <label htmlFor="username">Username{required}</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username.value || ''}
            onChange={e => setUsername({ value: e.target.value, touched: true })}
            aria-label="enter your username"
            aria-required="true"
            aria-describedby="usernameError"
            aria-invalid={!!username.error}
            onBlur={updateValidationErrors}
          />
          <ValidationError id="usernameError" message={username.error} />
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={e => setPassword({ value: e.target.value, touched: true })}
            value={password.value}
            aria-label="create a password"
            aria-required="true"
            aria-describedby="passwordError"
            aria-invalid={!!password.error}
            onBlur={updateValidationErrors}
          />
          <ValidationError id="passwordError" message={password.error} />
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="repeat-password">Repeat Password*</label>
          <input
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            onChange={e => setRepeatPassword({ value: e.target.value, touched: true })}
            value={repeatPassword.value}
            aria-label="re-enter password"
            aria-required="true"
            aria-describedby="repeatPasswordError"
            aria-invalid={!!repeatPassword.error}
            onBlur={updateValidationErrors}
          />
          <ValidationError id="repeatPasswordError" message={repeatPassword.error} />
        </fieldset>
        <div className="form-controls">
          <button type="submit" disabled={username.error || password.error || repeatPassword.error}>Submit</button>
          <Link to="/public/signin">Cancel</Link>
        </div>
        {!!serverError
          ? <ValidationError id="serverError" message={serverError.message} style={{ marginTop: "8px", display: "block" }} />
          : null}
      </form>
    </CentralContainer>
  );
}

ResetPasswordForm.defaultProps = {
  token: ''
}

ResetPasswordForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  token: PropTypes.string
}

export default withRouter(ResetPasswordForm);
