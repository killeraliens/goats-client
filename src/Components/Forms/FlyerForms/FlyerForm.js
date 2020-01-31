import React, {  useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import '../Forms.css';
import CountryRegionCityFormGroup from '../CountryCityMenu/CountryRegionCityFormGroup';
import EventFieldset from './EventFieldset';
import EventsPreview from './EventsPreview';
import FlyerUpload from '../ImageUpload/FlyerUpload';
import ValidationError from '../ValidationError/ValidationError';
import ContentEditable from '../ContentEditable';

export default function FlyerForm({ newType, flyer, events, creatorId }) {
  const flyerEvents = events.filter(event => event.flyer_id == flyer.id)
  const [formBody, setFormBody] = useState({
    imgUrl: { value: flyer.image_url || '' , error: ''},
    headline: { value: flyer.headline || '', touched: false, error: '' },
    events: flyerEvents || [],
    //event.flyer_id gets set on server along with flyer id
    date: { value: '', touched: false, error: ''},
    venueName: { value: '', touched: false, error: ''},
    countryName: { value: '', code: ''},
    regionName: { value: '', array: [] },
    cityName: { value: '', touched: false, error: '' },
    //
    bands: { value: flyer.bands || '', touched: false, error: '' },
    details: { value: flyer.details|| '', touched: false, error: '' },
    publishComment: { value: flyer.publish_comment || '', touched: false, error: '' },
    creatorId: flyer.creator_id || creatorId,
    type: flyer.type || newType,
    listingState: flyer.listing_state || "Public"
  })
  const [disabled, setDisabled] = useState(true)
  const [touched, setTouched] = useState(false)
  // const [serverError, setServerError] = useState(null)

  const resetForm = () => {
    setFormBody({
      imgUrl: { value: flyer.image_url || '', error: '' },
      headline: { value: flyer.headline || '', touched: false, error: '' },
      events: flyerEvents || [],
      date: { value: '', touched: false, error: '' },
      venueName: { value: '', touched: false, error: '' },
      countryName: { value: '', code: '' },
      regionName: { value: '', array: [] },
      cityName: { value: '', error: '' },
      bands: { value: flyer.bands || '', touched: false, error: '' },
      details: { value: flyer.details || '', touched: false, error: '' },
      publishComment: { value: flyer.publish_comment || '', touched: false, error: '' },
      creatorId: flyer.creator_id || creatorId,
      type: flyer.type || newType,
      listingState: flyer.listing_state || "Public"
    })
  }

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

  // const updateCountryRegionCity = (fields) => {
  //   setFormBody(prev => ({ ...prev, ...fields }))
  // }
  const updateEventFields = (fields) => {
    setFormBody(prev => ({ ...prev, ...fields }))
  }

  const updateImgUrl = (url) => {
    setFormBody(prev => ({ ...prev, imgUrl: { value: url } }))
  }

  const updateImgError = (error) => {
    setFormBody(prev => ({ ...prev, imgUrl: { ...prev.imgUrl, error: error } }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (e.target.value === "Draft") {
      setFormBody(prev => ({ ...prev, listing_state: "Draft" }))
    }
    // const postBody = {
    //   creator_id: formBody.creatorId,
    //   type: formBody.type,
    //   image_url: formBody.imgUrl.value,
    //   headline: formBody.headline.value,
    //   bands: formBody.bands.value,
    //   details: formBody.details.value,
    //   publish_comment: formBody.publishComment.value,
    //   listing_state: formBody.listingState,
    //   // have server iterate and create events
    //   events_array: formBody.events
    // }
    // console.log('postBOD', JSON.stringify(postBody))
    console.log('formBOD', formBody)
  //   const options = {
  //     method: 'POST',
  //     body: JSON.stringify(postBody),
  //     headers: {
  //       "Content-Type": "application/json",
  //     }
  //   }
  //   const response = await fetch(`${config.API_ENDPOINT}/api/auth/signin`, options)
  //   const body = await response.json();

  //   if (!response.ok) {
  //     setServerError(body)
  //   } else {
  //     resetForm()
  //     let user = body.token ? body : null
  //     context.updateAuthenticated(user)
  //     props.history.push(`/forum`)
  //   }
  // }
  }

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

  const validateContentEditableLength = (fieldStr, maxLength) => {
    let stringNoHtml = formBody[fieldStr].value ? formBody[fieldStr].value.replace(/(<[^>]*>)|(&nbsp;)/g, "") : ""
    let stringNoSpace = stringNoHtml.replace(/\s/g, "")
    if (stringNoSpace.length >= maxLength) {
      return `Keep it under ${maxLength} characters`
    }
    return ""
  }

  const returnCleanContentEditable = (fieldStr) => {
    return formBody[fieldStr].value.replace(/(<[^>]*>)|(&nbsp;)/g, "")
  }

  useEffect(() => {
    console.log("EVENTS UPDATED", formBody.events)
  }, [formBody.events])

  const addTourStop = (e) => {
    e.preventDefault()

    let eventFields = ["date", "venueName", "countryName", "regionName", "cityName"]
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
    if(invalidValues.length === 0 && validValues.length > 0) {
      console.log('YES')
      setFormBody(prev => ({
        ...prev,
        events: [
          ...prev.events,
          { date: formBody.date.value, venue_name: formBody.venueName.value, country_name: formBody.countryName.value, region_name: formBody.regionName.value, city_name: formBody.cityName.value }
        ]}))
    }
  }

  return(
    <form className="FlyerForm" onSubmit={handleSubmit}>
      <FlyerUpload updateImgUrl={updateImgUrl} updateImgError={updateImgError} />
      <fieldset>
        <label htmlFor="headline">Headline*</label>
        <input
          id="headline"
          name=""
          type="text"
          placeholder={`${newType} Headline`}
          value={formBody.headline.value || ''}
          onChange={e => {
            e.persist();
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
      <EventsPreview events={formBody.events} />
      <EventFieldset
        updateEventFields={updateEventFields}
        addTourStop={addTourStop}
        formDate={formBody.date}
        formCountryRegionCity={{ countryName: formBody.countryName, regionName: formBody.regionName, cityName: formBody.cityName}}
        formVenue={formBody.venueName}
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
            console.log(returnCleanContentEditable("bands"))
            console.log(formBody.bands.value)
            return setFormBody(prev => ({ ...prev, bands: { value: e.target.value, touched: true, error: validateContentEditableLength("bands", 280) } }))
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
            return setFormBody(prev => ({ ...prev, details: { value: e.target.value, touched: true, error: validateContentEditableLength("details", 280) } }))
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
      <div className="form-controls">
        <button type="submit" disabled={disabled} value="Public">Publish</button>
        {/* <button type="button" disabled={!touched} value="Draft" onClick={handleSubmit}>Save As Draft</button> */}
        <input type="reset" onClick={resetForm} value="Cancel" />
      </div>
    </form>
  )
}

FlyerForm.defaultProps = {
  flyer: {},
  events: []
}

FlyerForm.propTypes = {
  newType: PropTypes.oneOf([
    "Fest",
    "Tour",
    "Show"
  ]),
  creatorId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  flyer: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    creator_id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    type: PropTypes.oneOf([
      "Fest",
      "Tour",
      "Show"
    ]),
    image_url: PropTypes.string,
    headline: PropTypes.string,
    created: PropTypes.string,
    modified: PropTypes.string,
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
    ])
  }),
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    flyer_id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  }))
}
