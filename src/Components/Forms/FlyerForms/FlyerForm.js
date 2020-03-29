import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom'
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
import { dateWithYear, addDaysToDateReturnMMDDString } from '../../../helpers/dateHelpers'
import { capitalize } from '../../../helpers/textHelpers'
import FlyerCardMenu from '../../FlyerCardMenu/FlyerCardMenu'

const uuid = require('uuid/v1');
// const MemoizedComponent = React.memo(EventsPreview,
//   (prevProps, nextProps) => {
//     if (prevProps !== nextProps) {
//       return false;
//     }
//     /*
//       When using this function you always need to return
//       a Boolean. For now we'll say the props are NOT equal
//       which means the component should rerender.
//     */
//     return true;
//   }
// )


function FlyerForm({ history, newType, flyer, creatorId }) {
  const { addFlyer, updateFlyer } = useContext(AuthedContext)
  const { user, setError } = useContext(AppContext)

  const [formBody, setFormBody] = useState({
    //id: flyer.id || '',
    imgUrl: { value: flyer.image_url || '' , error: ''},
    headline: { value: flyer.headline || '', touched: false, error: '' },
    events: flyer.events || [],
    //
    date: { value: '', touched: false, error: ''},
    endDate: { value: '', touched: false, error: '' },
    venueName: { value: '', touched: false, error: ''},
    countryName: { value: '', code: ''},
    regionName: { value: '', array: [] },
    cityName: { value: '', touched: false, error: '' },
    //
    bands: { value: flyer.bands || '', touched: false, error: '' },
    details: { value: flyer.details|| '', touched: false, error: '' },
    publishComment: { value: flyer.publish_comment || '', touched: false, error: '' },
    creatorId: flyer.creator_id || creatorId,
    type: flyer.flyer_type || newType,
    listingState: flyer.listing_state || "Public",
    created: flyer.created || ''
  })
  const [disabled, setDisabled] = useState(true)
  const [touched, setTouched] = useState(false)
  const [serverError, setServerError] = useState(null)
  const [fetching, setFetching] = useState(false)
  const [isDateReq, setIsDateReq] = useState(false)

  const resetForm = () => {
    setIsDateReq(false)
    setFormBody({
      id: flyer.id || '',
      imgUrl: { value: flyer.image_url || '', error: '' },
      headline: { value: flyer.headline || '', touched: false, error: '' },
      events: flyer.events || [],
      date: { value: '', touched: false, error: '' },
      endDate: { value: '', touched: false, error: '' },
      venueName: { value: '', touched: false, error: '' },
      countryName: { value: '', code: '' },
      regionName: { value: '', array: [] },
      cityName: { value: '', error: '' },
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
  }, [
    formBody.date.value,
    formBody.endDate.value,
    formBody.venueName.value,
    formBody.countryName.value,
    formBody.regionName.value,
    formBody.cityName.value,
  ])

  useEffect(() => {
    if (flyer && flyer.events && flyer.events.length > 0) {
      let showFestEventsArr = flyer.events
      function setNewEvents() {
        return setFormBody(prev => ({ ...prev, events: [...showFestEventsArr] }))
      }
      return setNewEvents()
    }
  }, [flyer.events])

  useEffect(() => {
    setFormBody(prev => ({ ...prev, type: newType }))
    resetEventFields()
  }, [newType])

  useEffect(() => {
    resetForm()
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
    const touched = () => {
      let touched = Object.values(formBody).filter(value => value && Boolean(value.touched) && Boolean(value.value))
      if (touched.length > 0) {
        setTouched(true)
      } else {
        setTouched(false)
      }
    }
    setDisabledIfErrors()
    touched()
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

  // formBody.events array for "Show" or "Fest" (hidden EventsPreview, unless edit) (gens temp id for edit EventsPreview)
  const returnShowFestEventsArr = () => {
    if (formBody.type === "Show" || formBody.type === "Fest") {
      let eventFields = ["date", "endDate", "venueName", "countryName", "regionName", "cityName"]
      let invalidValues = eventFields.filter(field => {
        if (Boolean(formBody[field].error)) {
          return formBody[field].value
        }
      })
      let validValues = eventFields.filter(field => {
        if (!Boolean(formBody[field].error) && Boolean(formBody[field].value)) {
          return formBody[field].value
        }
      })

      // check to see if date field is filled or no event
      if (Boolean(formBody.date.value) && invalidValues.length === 0 && validValues.length > 0) {
        let dayCount = formBody.type === "Fest"
          ? (dateWithYear(formBody.endDate.value) - dateWithYear(formBody.date.value)) / 86400000
          : 1

        let eventsArr = []
        if ((formBody.date.touched && !Boolean(formBody.date.error)) && (!formBody.endDate.touched || Boolean(formBody.endDate.error))) {
          setIsDateReq(false)
          for (let i = 0; i < 1; i++) {
            let generatedEventId = uuid()
            let newEvent = {
              id: generatedEventId,
              event_date: addDaysToDateReturnMMDDString(formBody.date.value, i),
              venue_name: formBody.venueName.value,
              country_name: formBody.countryName.value,
              region_name: formBody.regionName.value,
              city_name: formBody.cityName.value
            }
            eventsArr.push(newEvent)
          }
        } else if ((formBody.date.touched && !Boolean(formBody.date.error)) && (formBody.endDate.touched && !Boolean(formBody.endDate.error))) {
          setIsDateReq(false)
          for (let i = 0; i <= dayCount && i < (dayCount +1); i++) {
            let generatedEventId = uuid()
            let newEvent = {
              id: generatedEventId,
              event_date: addDaysToDateReturnMMDDString(formBody.date.value, i),
              venue_name: formBody.venueName.value,
              country_name: formBody.countryName.value,
              region_name: formBody.regionName.value,
              city_name: formBody.cityName.value
            }
            eventsArr.push(newEvent)
          }
        }
        return eventsArr
      } else if (!Boolean(formBody.date.value) && validValues.length > 0) {
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
    let eventFields = ["date", "endDate", "venueName", "countryName", "regionName", "cityName"]
    let invalidValues = eventFields.filter(field => {
      if (Boolean(formBody[field].error)) {
        return formBody[field].value
      }
    })
    let validValues = eventFields.filter(field => {
      if (!Boolean(formBody[field].error) && Boolean(formBody[field].value)) {
        return formBody[field].value
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
            city_name: formBody.cityName.value
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


  const handleSubmit = async(e) => {
    e.preventDefault()

    const eventPostBodies = formBody.events.map(event => {

      const formattedDate = event.event_date && event.event_date.length === 5
        ? dateWithYear(event.event_date)
        : event.event_date && event.event_date.length > 5
          ? event.event_date
          : null

      return {
        event_date: formattedDate,
        venue_name: capitalize(event.venue_name),
        city_name: capitalize(event.city_name),
        region_name: event.region_name,
        country_name: event.country_name
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
        } else {
          body = await response.json();
          addFlyer(body)
        }
      }

      if (flyerPostBody.listing_state === "Draft" ) {
        history.push(`/dashboard/${formBody.creatorId}/drafts`)
      }
      history.push(`/fliers`)
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
    setError(serverError)
    // return (
    //     <NotFound
    //       message="Session expired"
    //       isFetching={fetching}
    //       link={<Link to='/public/signin' >Sign In</Link>}
    //     />
    // )
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
        formBody.type === "Tour" || formBody.type === "Fest" || formBody.type === "Show" || flyer && flyer.events && flyer.events.length > 0
          ? (
            <EventsPreview
              formEvents={formBody.events}
              deleteFormEvent={deleteFormEvent}
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
        <input type="reset" onClick={() => {
          resetForm()
          return history.push('/post')
          }} value="Cancel" />
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
      city_id: PropTypes.number
    }))
  })
}

export default withRouter(FlyerForm)
