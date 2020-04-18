import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import './InlineForm.css'
import config from '../../../config'
import ValidationError from '../ValidationError/ValidationError'
import AppContext from '../../../AppContext';

export default function InlineForm({ name, type, nameDB }) {
  const [value, setValue] = useState({ value: '', touched: false, error: ''})
  const [serverError, setServerError] = useState('')
  const [fetching, setFetching] = useState(false)
  const { user, updateAuthenticated, setToast } = useContext(AppContext)

  const resetForm = () => {
    setValue({ value: '', touched: false, error: '' })
  }

  const validateUsername = () => {
    if (value.touched) {
      const trimmedUsername = value.value.trim()
      return trimmedUsername.length === 0
        ? 'username required'
        : !(/^[a-zA-Z]{4,20}$/.test(trimmedUsername))
          ? 'must be between 4 and 20 characters long, letters only'
          : serverError && serverError.message === `Username ${trimmedUsername} is already in use.`
            ? 'username is already in use'
            : ''
    }
    return ''
  }

  const updateValidationErrors = () => {
    if (name === 'username') {
      setValue(prev => ({ ...prev, error: validateUsername() }))
    }
    // setValue(prev => ({ ...prev, error: validateEmail() }))
    // setValue(prev => ({ ...prev, error: validatePassword() }))
    // setValue(prev => ({ ...prev, error: validateRepeatPassword() }))
  }

  useEffect(() => {
    updateValidationErrors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverError, value.value])


  const handleChange = (e) => {
    if(type === 'text') {
      setValue({ value: e.target.value, touched: true, error: ''})
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('form submitted')
    const patchBody = {
      id: user.id,
      [nameDB]: value.value
    }
    const options = {
      method: 'PATCH',
      body: JSON.stringify(patchBody),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      }
    }
    try {
      const response = await fetch(`${config.API_ENDPOINT}/user/${user.id}`, options)
      if (!response.ok) {
        const body = await response.json();
        setServerError(body.message)
        setFetching(false)
      } else {
        setServerError('')
        setFetching(false)
        resetForm() //collapse with new value
        const patchedUser = {
          ...user,
          ...patchBody
        }
        updateAuthenticated(patchedUser)
        setToast({ message: `${name} successfully updated.` })
      }
    } catch (error) {
      setServerError(error.message)
      setFetching(false)
    }
  }
  return (
    <form className="InlineForm dark-mode" onSubmit={handleSubmit}>
      <fieldset>
        <label
          htmlFor={`${name}`}
          className="sr-only"
        >
          {name}
        </label>
        <input
          id={name}
          name={name}
          type={type}
          value={value.value}
          aria-label={name}
          aria-required="false"
          aria-invalid={value.value === user[name]}
          aria-describedby={`${name}Error`}
          onChange={handleChange}
        />
        <ValidationError
          id={`${name}Error`}
          message={!!serverError ? serverError : !!value.error ? value.error : ''}
        />
      </fieldset>
      <div className="form-controls">
        <button type="submit" disabled={value.value === user[name]}>Submit</button>
        {/* <Link to="/public/signup">New Account</Link>{' '}
        <Link to="/public/recover">Forgot password?</Link> */}
      </div>
    </form>
  )
}

InlineForm.defaultProps = {
  name: '',
  type: 'text'
}

InlineForm.propTypes = {
  name: PropTypes.oneOf([
    'username', 'email', 'password'
  ]),
  type: PropTypes.oneOf([
    'text'
  ]),
  nameDB: PropTypes.string.isRequired
}
