import React, { useState, useEffect, useContext } from 'react';
import { withRouter, Link } from 'react-router-dom'
import config from '../../../config';
import PropTypes from 'prop-types';
import '../Forms.css';
import AuthedContext from '../../../AuthedContext';
import AppContext from '../../../AppContext';
import EventFieldset from './EventFieldset';
import EventsPreview from './EventsPreview';
import FlyerUpload from '../ImageUpload/FlyerUpload';
import ValidationError from '../ValidationError/ValidationError';
import ContentEditable from '../ContentEditable';
import Spinner from '../../Spinner/Spinner';
import { addDaysToDateReturnMMDDYYYYString, returnFirstDateMMDDYYYY, returnLastDateMMDDYYYY } from '../../../helpers/dateHelpers'
import { capitalize } from '../../../helpers/textHelpers'
import FlyerCardMenu from '../../FlyerCardMenu/FlyerCardMenu'
import NotFound from '../../NotFound/NotFound'
const uuid = require('uuid/v1');

function FlyerForm({ history, newType, flyer, creatorId }) {
  const { addFlyer, updateFlyer } = useContext(AuthedContext)
  const { user, setToast } = useContext(AppContext)
  const [disabled, setDisabled] = useState(true)
  const [serverError, setServerError] = useState(null)
  const [fetching, setFetching] = useState(false)
  const [isDateReq, setIsDateReq] = useState(false)

  const firstDate = flyer && flyer.flyer_type !== 'Tour' && flyer.events && flyer.events.length > 0
    ? returnFirstDateMMDDYYYY(flyer.events.map(e => e.event_date))
    : ''
  const lastDate = flyer && flyer.flyer_type === 'Fest' && flyer.events && flyer.events.length > 0
    ? returnLastDateMMDDYYYY(flyer.events.map(e => e.event_date))
    : ''
  const firstVenue = flyer && flyer.flyer_type !== 'Tour' && flyer.events && flyer.events.length > 0
    ? flyer.events[0].venue_name
    : ''
  const firstCountry = flyer && flyer.flyer_type !== 'Tour' && flyer.events && flyer.events.length > 0
    ? flyer.events[0].country_name
    : ''
  const firstRegion = flyer && flyer.flyer_type !== 'Tour' && flyer.events && flyer.events.length > 0
    ? flyer.events[0].region_name
    : ''
  const firstCity = flyer && flyer.flyer_type !== 'Tour' && flyer.events && flyer.events.length > 0
    ? flyer.events[0].city_name
    : ''
  const firstCancelled = flyer && flyer.flyer_type !== 'Tour' && flyer.events && flyer.events.length > 0
    ? flyer.events[0].cancelled
    : false

  const [formBody, setFormBody] = useState({
    //id: flyer.id || '',
    imgUrl: { value: flyer.image_url || '' , error: ''},
    headline: { value: flyer.headline || '', touched: false, error: '' },
    events: flyer.events || [],
    //
    date: { value: firstDate, touched: false, error: ''},
    endDate: { value: lastDate, touched: false, error: '' },
    venueName: { value: firstVenue, touched: false, error: ''},
    countryName: { value: firstCountry, code: ''},
    regionName: { value: firstRegion, array: [] },
    cityName: { value: firstCity, touched: false, error: '' },
    cancelled: firstCancelled,
    //
    bands: { value: flyer.bands || '', touched: false, error: '' },
    details: { value: flyer.details|| '', touched: false, error: '' },
    publishComment: { value: flyer.publish_comment || '', touched: false, error: '' },
    creatorId: flyer.creator_id || creatorId,
    type: flyer.flyer_type || newType,
    listingState: flyer.listing_state || "Public",
    created: flyer.created || ''
  })

  const resetForm = () => {
    setIsDateReq(false)
    setFormBody({
      id: flyer.id || '',
      imgUrl: { value: flyer.image_url || '', error: '' },
      headline: { value: flyer.headline || '', touched: false, error: '' },
      events: flyer.events || [],
      date: { value: firstDate, touched: false, error: '' },
      endDate: { value: lastDate, touched: false, error: '' },
      venueName: { value: firstVenue, touched: false, error: '' },
      countryName: { value: firstCountry, code: '' },
      regionName: { value: firstRegion, array: [] },
      cityName: { value: firstCity, error: '' },
      cancelled: firstCancelled,
      bands: { value: flyer.bands || '', touched: false, error: '' },
      details: { value: flyer.details || '', touched: false, error: '' },
      publishComment: { value: flyer.publish_comment || '', touched: false, error: '' },
      creatorId: flyer.creator_id || creatorId,
      type: flyer.flyer_type || newType,
      listingState: flyer.listing_state || "Public",
    })
  }

  const resetEventFields = () => {
    setIsDateReq(false)
    setFormBody(prev => ({
      ...prev,
      date: { value: '', touched: false, error: '' },
      endDate: { value: '', touched: false, error: '' },
      venueName: { value: '', touched: false, error: '' },
      countryName: { value: '', code: '' },
      regionName: { value: '', array: [] },
      cityName: { value: '', error: '' },
      cancelled: false
    }))
  }

  useEffect(() => {
    if (formBody.type === "Show" || formBody.type === "Fest" ) {
      let showFestEventsArr = returnShowFestEventsArr()
      function setNewEvents() {
        return setFormBody(prev => ({ ...prev, events: [...showFestEventsArr] }))
      }
      return setNewEvents()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // formbody.type, // with this the events will completely erase if you change flyer type
    formBody.date.value,
    formBody.date.error,
    //all below will pass initial validations reguardless of errors for preview
    formBody.endDate.value,
    formBody.venueName.value,
    formBody.countryName.value,
    formBody.regionName.value,
    formBody.cityName.value,
    formBody.cancelled,

  ])

  useEffect(() => {
    if (flyer && flyer.events && flyer.events.length > 0) {
      let showFestEventsArr = flyer.events
      function setNewEvents() {
        return setFormBody(prev => ({ ...prev, events: [...showFestEventsArr] }))
      }
      return setNewEvents()
    }
  }, [flyer, flyer.events])

  useEffect(() => {
    setFormBody(prev => ({ ...prev, type: newType }))
    resetEventFields()
  }, [newType])

  useEffect(() => {
    resetForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const setDisabledIfErrors = () => {
      let errors = Object.values(formBody).filter(value => value && Boolean(value.error))
      if (errors.length > 0 || !Boolean(formBody.headline.value) || !Boolean(formBody.imgUrl.value)) {
        setDisabled(true)
      } else {
        setDisabled(false)
      }
    }

    setDisabledIfErrors()
  }, [formBody])

  const updateEventFields = (fields) => {
    setFormBody(prev => ({ ...prev, ...fields }))
  }

  const updateImgUrl = (url) => {
    setFormBody(prev => ({ ...prev, imgUrl: { value: url } }))
  }

  const updateImgError = (error) => {
    setFormBody(prev => ({ ...prev, imgUrl: { ...prev.imgUrl, error: error } }))
  }

  const returnCleanContentEditable = (htmlText) => {
    // return htmlText.replace(/(<[^>]*>)|(&nbsp;)/g, "")
    return htmlText
  }

  // formBody.events array for "Show" or "Fest" (gens temp id for edit EventsPreview)
  const returnShowFestEventsArr = () => {
    if (formBody.type === "Show" || formBody.type === "Fest") {
      let eventFields = ["date", "endDate", "venueName", "countryName", "regionName", "cityName"]
      let invalidValues = eventFields.filter(field => {
        if (Boolean(formBody[field].error)) {
          return formBody[field].value
        } else {
          return null
        }
      })
      let validValues = eventFields.filter(field => {
        if (!Boolean(formBody[field].error) && Boolean(formBody[field].value)) {
          return formBody[field].value
        } else {
          return null
        }
      })

      // check to see if date field is valid or no event, id is temporary for events preview
      if (Boolean(formBody.date.value) && invalidValues.length === 0 && validValues.length > 0) {
        const endDateVal = new Date(formBody.endDate.value)
        const dateVal = new Date(formBody.date.value)
        let dayCount = formBody.type === "Fest" && formBody.endDate.value.length === 10 && !Boolean(formBody.endDate.error)
          ? (endDateVal - dateVal) / 86400000 + 1
          : 1

        let eventsArr = []
        setIsDateReq(false)
        for (let i = 0; i < dayCount && dayCount <= 7; i++) {
          let generatedEventId = uuid()
          let newEvent = {
            id: generatedEventId,
            event_date: addDaysToDateReturnMMDDYYYYString(formBody.date.value.trim(), i),
            venue_name: formBody.venueName.value,
            country_name: formBody.countryName.value,
            region_name: formBody.regionName.value,
            city_name: formBody.cityName.value,
            cancelled: formBody.cancelled
          }
          eventsArr.push(newEvent)
        }
        return eventsArr
      } else if (!Boolean(formBody.date.value.trim()) && validValues.length > 0) {
        setIsDateReq(true)
        return []
      }
      return []
    }
    return []
  }

  // formBody.events array for "Tour" (gens temp id for EventsPreview)
  const addTourStop = (e) => {
    e.preventDefault()
    let eventFields = ["date", "endDate", "venueName", "countryName", "regionName", "cityName", "cancelled"]
    let invalidValues = eventFields.filter(field => {
      if (Boolean(formBody[field].error)) {
        return formBody[field].value
      } else {
        return null
      }
    })
    let validValues = eventFields.filter(field => {
      if (!Boolean(formBody[field].error) && Boolean(formBody[field].value)) {
        return formBody[field].value
      } else {
        return null
      }
    })
    if (Boolean(formBody["date"].value) && invalidValues.length === 0 && validValues.length > 0) {
      let generatedEventId = uuid()
      setFormBody(prev => ({
        ...prev,
        events: [
          ...prev.events,
          {
            id: generatedEventId,
            event_date: formBody.date.value,
            venue_name: formBody.venueName.value,
            country_name: formBody.countryName.value,
            region_name: formBody.regionName.value,
            city_name: formBody.cityName.value,
            cancelled: formBody.cancelled
          }
        ]
      }))
      resetEventFields()
    } else {
      setIsDateReq(true)
    }
  }

  //EventPreview props
  const deleteFormEvent = (id) => {
    let filteredEvents = formBody.events.filter(event => event.id !== id)
    setFormBody(prev => ({
      ...prev,
      events: filteredEvents
    }))
  }

  const updateFormEvent = (id, cancelledBool) => {
    let updatedEvents = formBody.events.map(event => {
       if (event.id === id) {
         return { ...event, cancelled: cancelledBool}
       }
       return event
    })
    setFormBody(prev => ({
      ...prev,
      events: updatedEvents
    }))
  }


  const handleSubmit = async(e) => {
    e.preventDefault()

    const eventPostBodies = formBody.events.map(event => {

      // const formattedDate = event.event_date && event.event_date.length === 5
      //   ? dateWithYear(event.event_date)
      //   : event.event_date && event.event_date.length > 5
      //     ? event.event_date
      //     : null

      return {
        // event_date: formattedDate,
        event_date:  event.event_date,
        venue_name: capitalize(event.venue_name),
        city_name: capitalize(event.city_name),
        region_name: event.region_name,
        country_name: event.country_name,
        cancelled: event.cancelled
      }
    })

    const flyerPostBody = {
      creator_id: formBody.creatorId,
      flyer_type: formBody.type,
      image_url: formBody.imgUrl.value,
      headline: capitalize(formBody.headline.value),
      bands: returnCleanContentEditable(formBody.bands.value),
      details: returnCleanContentEditable(formBody.details.value),
      publish_comment: returnCleanContentEditable(formBody.publishComment.value),
      listing_state: e.target.value === "Draft" ? "Draft" : "Public",
      events: eventPostBodies
    }

    const isPatch = formBody.id && Boolean(formBody.id) ? true : false
    const patchId = isPatch ? formBody.id : null
    const options = isPatch
      ? ({
        method: 'PATCH',
        body: JSON.stringify(flyerPostBody),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      : ({
        method: 'POST',
        body: JSON.stringify(flyerPostBody),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })

    const response = await fetch(`${config.API_ENDPOINT}/flyer${isPatch ? `/${patchId}` : ''}`, options)
    let body

    if (!response.ok) {
      body = await response.json();
      setServerError({status: response.status, message: body.message })
      setFetching(false)
    } else {
      setServerError(null)
      resetForm()
      setFetching(false)
      if (flyerPostBody.listing_state !== "Draft") {
        if (isPatch) {
          updateFlyer(patchId, flyerPostBody)
          setToast({ message: `Flier successfully updated.`})
        } else {
          body = await response.json();
          addFlyer(body)
          setToast({ message: `Flier successfully posted.`})
        }
      }
      if (flyerPostBody.listing_state === "Draft" ) {
        setToast({ message: `Draft created.`})
        history.push(`/dashboard/${formBody.creatorId}/drafts`)
      }
      return isPatch ? history.goBack() : history.push(`/fliers`)
    }
  }


  // headline fieldset validation (updates on blur)
  const validateHeadline = () => {
    if (formBody.headline.touched) {
      const trimmedHeadline = formBody.headline.value.trim()
      return trimmedHeadline.length === 0
        ? 'Headline required'
        : trimmedHeadline.length > 100
        ? `${trimmedHeadline.length - 100} over 100 character max limit.`
        : ''
    }
    return ''
  }

  const updateValidationErrors = () => {
    setFormBody(prev => ({ ...prev, headline: { ...prev.headline, error: validateHeadline()}}))
  }

  // bands, details, publish with comment fieldsets validation (updates on change)
  const validateContentEditableLength = (fieldStr, maxLength) => {
    let stringNoHtml = formBody[fieldStr].value ? formBody[fieldStr].value.replace(/(<[^>]*>)|(&nbsp;)/g, "") : ""
    //let stringNoSpace = stringNoHtml.replace(/\s/g, "")
    // if (stringNoSpace.length >= maxLength) {
    if (stringNoHtml.length > maxLength) {
      return `Keep it under ${maxLength} characters. Current total ${stringNoHtml.length}.`
    }
    return ""
  }



  if (fetching) {
    return <Spinner />
  }
  else if (serverError && serverError.status === 401) {
    return (
        <NotFound
          message="Session expired"
          isFetching={fetching}
          link={<Link to='/public/signin' >Sign In</Link>}
        />
    )
  }
  return(
    <form className="FlyerForm" onSubmit={handleSubmit} aria-describedby="serverResponseError">
      <FlyerUpload formImgUrl={formBody.imgUrl} updateImgUrl={updateImgUrl} updateImgError={updateImgError} />
      <div className="Flyer--icon-type Tag margin-bottom-8">{formBody.type}</div>
      {formBody.id ? <FlyerCardMenu creatorId={formBody.creatorId} flyerId={formBody.id} hasHandle={false}/> : null}
      <fieldset>
        <label htmlFor="headline">Headline*</label>
        <input
          id="headline"
          name=""
          type="text"
          placeholder={`${newType} Headline`}
          value={formBody.headline.value || ''}
          onChange={e => {
            e.persist()
            return setFormBody(prev => ({ ...prev, headline: { value: e.target.value, touched: true } }))
          }}
          aria-label="headline"
          aria-required="true"
          aria-describedby="headlineError"
          aria-invalid={!!formBody.headline.error}
          onBlur={updateValidationErrors}
        />
        <ValidationError id="headlineError" message={formBody.headline.error} />
      </fieldset>
      {
        (formBody.events && formBody.events.length > 0)
          ? (
            <EventsPreview
              formEvents={formBody.events.sort((aEvent, bEvent) => {
                return Date.parse(aEvent.event_date) - Date.parse(bEvent.event_date)
              })}
              deleteFormEvent={deleteFormEvent}
              updateFormEvent={updateFormEvent}
            />
          )
          : null
      }
      <EventFieldset
        updateEventFields={updateEventFields}
        addTourStop={addTourStop}
        formDate={formBody.date}
        formCountryRegionCity={{ countryName: formBody.countryName, regionName: formBody.regionName, cityName: formBody.cityName}}
        formVenue={formBody.venueName}
        formType={formBody.type}
        formEndDate={formBody.endDate}
        isDateReq={isDateReq}
        formCancelled={formBody.cancelled}
      />
      <fieldset>
        <label htmlFor="bands">Band Lineup</label>
        <ContentEditable
          id="bands"
          name="bands"
          className="textarea htmlField"
          html={formBody.bands.value || ''}
          ariaLabel="bands"
          ariaRequired="false"
          ariaDescribedBy="bandsError"
          ariaInvalid={!!formBody.bands.error}
          onChange={e => {
            return setFormBody(prev => ({ ...prev, bands: { value: e.target.value, touched: true, error: validateContentEditableLength("bands", 1200) } }))
          }}
        />
        <ValidationError id="bandsError" message={formBody.bands.error} />
      </fieldset>
      <fieldset>
        <label htmlFor="description">Details</label>
        <ContentEditable
          id="details"
          name="details"
          className="textarea htmlField"
          html={formBody.details.value || ''}
          ariaLabel="details"
          ariaRequired="false"
          ariaDescribedBy="detailsError"
          ariaInvalid={!!formBody.details.error}
          onChange={e => {
            return setFormBody(prev => ({ ...prev, details: { value: e.target.value, touched: true, error: validateContentEditableLength("details", 600) } }))
          }}
        />
        <ValidationError id="detailsError" message={formBody.details.error} />
      </fieldset>
      <fieldset>
        <label htmlFor="publishComment">Publish With Comment</label>
        <ContentEditable
          id="publishComment"
          name="publishComment"
          className="textarea htmlField"
          html={formBody.publishComment.value || ''}
          ariaLabel="publishComment"
          ariaRequired="false"
          ariaDescribedBy="publishCommentError"
          ariaInvalid={!!formBody.publishComment.error}
          onChange={e => {
            return setFormBody(prev => ({ ...prev, publishComment: { value: e.target.value, touched: true, error: validateContentEditableLength("publishComment", 280) } }))
          }}
        />
        <ValidationError id="publishCommentError" message={formBody.publishComment.error} />
      </fieldset>
      {serverError && serverError.status === 400 ? <p><ValidationError id="serverResponseError" message={serverError.message} /></p> : null }
      <div className="form-controls">
        <button type="submit" disabled={disabled} value="Public">Publish</button>
        {/* <button type="button" disabled={!touched} value="Draft" onClick={handleSubmit}>Save As Draft</button> */}
        <button type="reset" onClick={() => {
          resetForm()
          return formBody.id ? history.goBack() : history.push('/fliers')
        }}>
          Cancel
        </button>
      </div>
    </form>
  )
}

FlyerForm.defaultProps = {
  flyer: {},
  events: []
}

FlyerForm.propTypes = {
  history: PropTypes.object,
  newType: PropTypes.oneOf([
    "Fest",
    "Tour",
    "Show"
  ]),
  creatorId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  flyer: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    creator_id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    flyer_type: PropTypes.oneOf([
      "Fest",
      "Tour",
      "Show"
    ]),
    image_url: PropTypes.string,
    headline: PropTypes.string,
    created: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date)
    ]),
    modified: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date)
    ]),
    bands: PropTypes.string,
    details: PropTypes.string,
    publish_comment: PropTypes.string,
    listing_state: PropTypes.oneOf([
      'Draft',
      'Private',
      'Public',
      'Flagged',
      'Banned',
      'Archived'
    ]),
    events: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      flyer_id: PropTypes.string,
      event_date: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date)
      ]),
      venue_name: PropTypes.string,
      city_name: PropTypes.string,
      region_name: PropTypes.string,
      country_name: PropTypes.string,
      city_id: PropTypes.number,
      cancelled: PropTypes.bool
    }))
  })
}

export default withRouter(FlyerForm)
