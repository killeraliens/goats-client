import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import config from '../../../config';
import { Link, withRouter } from 'react-router-dom';
import ValidationError from '../ValidationError/ValidationError';
import CentralContainer from '../../CentralContainer/CentralContainer';
import AppContext from '../../../AppContext';
import Spinner from '../../Spinner/Spinner';
import '../Forms.css';

function RecoverPasswordForm(props) {
  const [username, setUsername] = useState({ value: '', touched: false, error: '' })
  const [fetching, setFetching] = useState(false)
  const [serverError, setServerError] = useState(null)
  const context = useContext(AppContext)

  const resetForm = () => {
    setUsername({ value: '', touched: false, error: '' })
  }

  const updateValidationErrors = () => {
    setUsername(prev => ({ ...prev, error: validateUsername() }))
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
  }, [username.value])

  const validateUsername = () => {
    if (username.touched) {
      const trimmedUsername = username.value.trim()
      return trimmedUsername.length === 0
        ? 'username required'
        : ''
    }
    return ''
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setFetching(true)
    const postBody = {
      username: username.value
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(postBody),
      headers: {
        "Content-Type": "application/json"
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
        props.history.push(`/fliers`)
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
      <form className="RecoverPasswordForm" onSubmit={handleOnSubmit}>
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
        <div className="form-controls">
          <button type="submit" disabled={username.error}>Submit</button>
          <Link to="/public/signin">Sign In</Link>
        </div>
      </form>
    </CentralContainer>
  );
}

RecoverPasswordForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  })
}

export default withRouter(RecoverPasswordForm);
