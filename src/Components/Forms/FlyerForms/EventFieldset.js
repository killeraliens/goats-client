import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CountryRegionCityFormGroup from '../CountryCityMenu/CountryRegionCityFormGroup';
import ValidationError from '../ValidationError/ValidationError';

export default function EventFieldset({ updateEventFields, addTourStop, formDate, formVenue, formCountryRegionCity, formType, formEndDate, formCancelled, isDateReq }) {
  let dateWithYear = (mmddFormat) => {
    let currYear = new Date().getFullYear()
    let testDateCurrYear = new Date(mmddFormat + '/' + currYear)
    let currDate = new Date()
    let testIfNeg = testDateCurrYear - currDate
    let year = testIfNeg > 0 ? currYear : currYear + 1
    return new Date(mmddFormat + '/' + year)
  }

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

  const validateEndDate = () => {
    if (formEndDate.touched && formEndDate.value !== "") {
      const trimmedEndDate = formEndDate.value.trim()
      return !(/(^(0[1-9]|1[012])\/|^([1-9]|1[012])\/)((0[1-9]|1\d|2\d|3[01]))/.test(trimmedEndDate))
        ? `Format as MM/DD`
        : trimmedEndDate.length > 5
          ? `Format as MM/DD`
          : dateWithYear(trimmedEndDate) < dateWithYear(formDate.value)
          ? `Must be after start date`
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
      updateEventFields({ endDate: { ...formEndDate, error: validateEndDate() } })
    }
    updateValidationErrors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formEndDate.value])

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

  const endDateFieldSet = () => {
      return(
        <fieldset className="date endDate">
          <label htmlFor="endDate">End Date</label>
          <input
            id="endDate"
            name="endDate"
            type="text"
            placeholder="mm/dd"
            value={formEndDate.value || ''}
            onChange={e => { updateEventFields({ endDate: { value: e.target.value, touched: true } }) }}
            aria-label="endDate"
            aria-required="false"
            aria-describedby="endDateError"
            aria-invalid={!!formEndDate.error}
            autoComplete="off"
          />
          <ValidationError id="endDateError" message={formEndDate.error} />
        </fieldset>
      )
  }

  const addTourStopBtn = () => {
    return(
      <button
        onClick={handleClick}
      >
        Add Tour Stop
      </button>
    )
  }

  return(
    <div className="EventFieldset">
      <div className="fieldset-container fieldset-container-dates-venue">
        <div className="fieldset-container sub-group">
          <fieldset className="date">
            <label htmlFor="date">Date{isDateReq ? ' *' : null}</label>
            <input
              id="date"
              name="date"
              type="text"
              placeholder="mm/dd"
              value={formDate.value || ''}
              onChange={e => {
                updateEventFields({ date: { value: e.target.value, touched: true } })
              }}
              aria-label="date"
              aria-required="false"
              aria-describedby="dateError"
              aria-invalid={!!formDate.error}
              autoComplete="off"
            />
            <ValidationError id="dateError" message={formDate.error} />
          </fieldset>
          { formType === "Fest" ? endDateFieldSet() : null }
        </div>
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
      <fieldset className="checkbox">
        <input
          id="cancelled"
          name="cancelled"
          className="checkbox"
          type="checkbox"
          value="Cancelled"
          onChange={e => { updateEventFields({ cancelled: e.target.checked }) }}
          checked={formCancelled}
        />
        <label htmlFor="cancelled">This is a cancelled event</label>
      </fieldset>
      { formType === "Tour" ? addTourStopBtn() : null}
    </div>
  )
}

EventFieldset.defaultProps = {
  updateEventFields: () => {},
  addTourStop: () => {},
  formDate: { error: "", touched: false, value: "" },
  formVenue: { error: "", touched: false, value: "" },
  formCountryRegionCity: {
    cityName: { error: "", touched: false, value: "" },
    countryName: { code: "", value: "" },
    regionName: { array:[], value: "" }
  },
  formCancelled: false
}

EventFieldset.propTypes = {
  updateEventFields: PropTypes.func,
  addTourStop: PropTypes.func,
  formDate: PropTypes.shape({
    value: PropTypes.string,
    touched: PropTypes.bool,
    error: PropTypes.string
  }),
  formEndDate: PropTypes.shape({
    value: PropTypes.string,
    touched: PropTypes.bool,
    error: PropTypes.string
  }),
  formVenue: PropTypes.shape({
    value: PropTypes.string,
    touched: PropTypes.bool,
    error: PropTypes.string
  }),
  formCountryRegionCity: PropTypes.shape({
    cityName: PropTypes.shape({
      value: PropTypes.string,
      touched: PropTypes.bool,
      error: PropTypes.string
    }),
    countryName: PropTypes.shape({
      code: PropTypes.string,
      value: PropTypes.string
    }),
    regionName: PropTypes.shape({
      array: PropTypes.array,
      value: PropTypes.string
    }),
  }),
  formType: PropTypes.oneOf([
    "Fest",
    "Tour",
    "Show"
  ]),
  formCancelled: PropTypes.bool,
  isDateReq: PropTypes.bool
}
