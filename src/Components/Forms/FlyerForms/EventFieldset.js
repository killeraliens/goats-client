import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CountryRegionCityFormGroup from '../CountryCityMenu/CountryRegionCityFormGroup';
import ValidationError from '../ValidationError/ValidationError';

export default function EventFieldset({ updateEventFields }) {
  const [date, setDate] = useState({ value: '', touched: false, error: '' })
  const [venueName, setVenueName] = useState({ value: '', touched: false, error: '' })

  const updateCountryRegionCity = (fields) => {
    updateEventFields(fields)
  }

  const validateDate = () => {
    if (date.touched && date.value !== "") {
      const trimmedDate = date.value.trim()
      // return !(/(^(0[1-9]|1[012])\/|^([1-9]|1[012])\/)((0[1-9]|1\d|2\d|3[01])|([1-9]|1\d|2\d|3[01]))/.test(trimmedDate))
      return!(/(^(0[1-9]|1[012])\/|^([1-9]|1[012])\/)((0[1-9]|1\d|2\d|3[01]))/.test(trimmedDate))
        ? `Format as MM/DD`
        : ''
    }
    return ''
  }

  const validateVenueName = () => {
    if (venueName.touched) {
      const trimmedVenueName = venueName.value.trim()
      return !(/^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/.test(trimmedVenueName)) && Boolean(trimmedVenueName)
        ? `Venue name format doesn't look right`
        : trimmedVenueName.length > 26
        ? 'Venue name must be under 26 characters long'
        : ''
    }
    return ''
  }

  useEffect(() => {
    updateEventFields({
      date: date,
      venueName: venueName
    })
  }, [date, venueName])

  useEffect(() => {
    const updateValidationErrors = () => {
      setDate(prev => ({ ...prev, error: validateDate() }))
    }
    updateValidationErrors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date.value])

  useEffect(() => {
    const updateValidationErrors = () => {
      setVenueName(prev => ({ ...prev, error: validateVenueName() }))
    }
    updateValidationErrors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [venueName.value])

  return(
    <div className="EventFieldset">
      <div className="fieldset-container sub-group">
        <fieldset className="date">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="text"
            placeholder="mm/dd"
            value={date.value || ''}
            onChange={e => {
              e.persist();
              return setDate({ value: e.target.value, touched: true })
            }}
            aria-label="date"
            aria-required="false"
            aria-describedby="dateError"
            aria-invalid={!!date.error}
          />
          <ValidationError id="dateError" message={date.error} />
        </fieldset>
        <fieldset className="grow">
          <label htmlFor="venueName">Venue Name</label>
          <input
            id="venueName"
            name="venueName"
            type="text"
            value={venueName.value || ''}
            onChange={e => {
              e.persist();
              return setVenueName({ value: e.target.value, touched: true })
            }}
            aria-label="venue name"
            aria-required="false"
            aria-describedby="venueNameError"
            aria-invalid={!!venueName.error}
          />
          <ValidationError id="venueNameError" message={venueName.error} />
        </fieldset>
      </div>
      <div className="fieldset-container">
        <CountryRegionCityFormGroup updateCountryRegionCity={updateCountryRegionCity} />
      </div>
      <button id="AddTourBtn" className="EventFieldset--add-btn tour">
        Add Tour Stop
      </button>
    </div>
  )
}

EventFieldset.defaultProps = {
  updateEventFields: () => { console.log('default updateEventFields function')}
}

EventFieldset.propTypes = {
  updateEventFields: PropTypes.func
}
