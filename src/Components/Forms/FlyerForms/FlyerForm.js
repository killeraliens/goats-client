import React, {  useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import '../Forms.css';
import CountryRegionCityFormGroup from '../CountryCityMenu/CountryRegionCityFormGroup';
import EventsPreview from './EventsPreview';
import FlyerUpload from '../ImageUpload/FlyerUpload';

export default function FlyerForm({ flyer, events, creatorId }) {
  const flyerEvents = events.filter(event => event.flyer_id == flyer.id)
  const [formBody, setFormBody] = useState({
    imgUrl: { value: flyer.image_url || '' },
    events: flyerEvents || [],
    // event: {
      date: { value: '', touched: false, error: ''},
      venueName: { value: '', error: ''},
      countryName: { value: '' },
      regionName: { value: '' },
      cityName: { value: '', error: '' },
      bands: { value: '', error: '' },
      description: { value: '', error: '' },
      publishComment: { value: '', error: '' },
      flyerCreatorId: creatorId
    // }
  })
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    const checkIfErrors = () => {
      Object.entries(formBody).forEach(([key, val]) => {
        if (Boolean(val.error)) {
            setDisabled(true)
        }
        setDisabled(false)
      })
    }
    checkIfErrors()
  }, [formBody])

  const updateCountryRegionCity = (fields) => {
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
    console.log('formBOD', formBody)
  }


  return(
    <form className="FlyerForm" onSubmit={handleSubmit}>
      <FlyerUpload updateImgUrl={updateImgUrl} updateImgError={updateImgError}/>
      <fieldset>
        <label for="headline">Headline*</label>
        <input type="text" placeholder="Fest Name" />
      </fieldset>
      <EventsPreview events={formBody.events} />
      <div class="EventFieldset">
        <div class="fieldset-container sub-group">
          <fieldset class="date">
            <label for="date">Date</label>
            <input id="date" name="date" type="text" placeholder="mm/dd" />
          </fieldset>
          <fieldset class="grow">
            <label for="venueName">Venue Name</label>
            <input type="text" id="venueName" name="venueName" />
          </fieldset>
        </div>
        <div class="fieldset-container">
          <CountryRegionCityFormGroup updateCountryRegionCity={updateCountryRegionCity}/>
        </div>
        <button id="AddTourBtn" class="EventFieldset--add-btn tour">
          Add Tour Stop
        </button>
      </div>

      <fieldset>
        <label for="bands">Band Lineup</label>
        <div class="textarea" name="bands" id="bands" contentEditable></div>
      </fieldset>
      <fieldset>
        <label for="description">Details</label>
        <div class="textarea" name="description" id="description" contentEditable></div>
      </fieldset>
      <fieldset>
        <label for="publishComment">Publish With Comment</label>
        <div class="textarea" name="publishComment" id="publishComment" contentEditable></div>
      </fieldset>
      <div className="form-controls">
        <button
          type="submit"
          disabled={disabled}
        >
          Publish
        </button>
        <a href="./index-draft-success">Save As Draft</a>
        <a href="./index.html">Cancel</a>
      </div>

    </form>
  )
}

FlyerForm.defaultProps = {
  flyer: {},
  events: []
}

FlyerForm.propTypes = {
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
