import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CountryRegionCityFormGroup from '../CountryCityMenu/CountryRegionCityFormGroup';
import ValidationError from '../ValidationError/ValidationError';

export default function EventFieldset({ updateEventFields, addTourStop, formDate, formVenue, formCountryRegionCity }) {

  const updateCountryRegionCity = (fields) => {
    updateEventFields(fields)
  }

  const validateDate = () => {
    if (formDate.touched && formDate.value !== "") {
      const trimmedDate = formDate.value.trim()
      // return !(/(^(0[1-9]|1[012])\/|^([1-9]|1[012])\/)((0[1-9]|1\d|2\d|3[01])|([1-9]|1\d|2\d|3[01]))/.test(trimmedDate))
      return!(/(^(0[1-9]|1[012])\/|^([1-9]|1[012])\/)((0[1-9]|1\d|2\d|3[01]))/.test(trimmedDate))
        ? `Format as MM/DD`
        : trimmedDate.length > 5
        ? `Format as MM/DD`
        : ''
    }
    return ''
  }

  const validateVenueName = () => {
    if (formVenue.touched) {
      const trimmedVenueName = formVenue.value.trim()
      return !(/^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/.test(trimmedVenueName)) && Boolean(trimmedVenueName)
        ? `Venue name format doesn't look right`
        : trimmedVenueName.length > 26
        ? 'Venue name must be under 26 characters long'
        : ''
    }
    return ''
  }


  useEffect(() => {
    const updateValidationErrors = () => {
      updateEventFields({ date: { ...formDate, error: validateDate() }})
    }
    updateValidationErrors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formDate.value])

  useEffect(() => {
    const updateValidationErrors = () => {
      updateEventFields({ venueName: { ...formVenue, error: validateVenueName() } })
    }
    updateValidationErrors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formVenue.value])

  const handleClick = (e) => {
    addTourStop(e)
  }

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
            value={formDate.value || ''}
            onChange={e => { updateEventFields({ date: { value: e.target.value, touched: true } }) }}
            aria-label="date"
            aria-required="false"
            aria-describedby="dateError"
            aria-invalid={!!formDate.error}
            autocomplete="off"
          />
          <ValidationError id="dateError" message={formDate.error} />
        </fieldset>
        <fieldset className="grow">
          <label htmlFor="venueName">Venue Name</label>
          <input
            id="venueName"
            name="venueName"
            type="text"
            value={formVenue.value || ''}
            onChange={e => { updateEventFields({ venueName: { value: e.target.value, touched: true } })}}
            aria-label="venue name"
            aria-required="false"
            aria-describedby="venueNameError"
            aria-invalid={!!formVenue.error}
          />
          <ValidationError id="venueNameError" message={formVenue.error} />
        </fieldset>
      </div>
      <div className="fieldset-container">
        <CountryRegionCityFormGroup updateCountryRegionCity={updateCountryRegionCity} formCountryRegionCity={formCountryRegionCity}/>
      </div>
      <button
        onClick={handleClick}
      >
        Add Tour Stop
      </button>
    </div>
  )
}

EventFieldset.defaultProps = {
  updateEventFields: () => { console.log('default updateEventFields function')},
  addTourStop: () => { console.log('default addTourStop function') }
}

EventFieldset.propTypes = {
  updateEventFields: PropTypes.func,
  addTourStop: PropTypes.func,
}
