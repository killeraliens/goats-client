import React, { useContext, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppContext from '../../../AppContext';
import Avatar from '../../Avatar/Avatar';
import './EditProfileForm.css';
import '../Forms.css';
import CountryRegionCityFormGroup from '../CountryCityMenu/CountryRegionCityFormGroup'


function EditProfileForm() {
  const [formBody, setFormBody] = useState({
    imgUrl: { value: '' },
    countryName: { value: '' },
    regionName: { value: '' },
    cityName: { value: '', error: '' }
  })
  const context = useContext(AppContext)

  useEffect(() => {
    console.log('State of the form', formBody)
  })

  const updateCountryRegionCity = (fields) => {
    setFormBody(prev => ({ ...prev, ...fields }))
  }

  return(
    <div className="Main--content no-margin">
      <form className="EditProfileForm header-form">

        <fieldset>
          <div className="flex-center-between">
            <div className="ImageFileButton">
              <label htmlFor="avatarImage">
                <Avatar
                  className="Main--avatar"
                  imgUrl={context.user.imgUrl}
                  username={context.user.username}
                >
                  <span>+IMAGE</span>
                </Avatar>
              </label>
              <input
                id="avatarImage"
                name="avatarImage"
                type="file"
                className="sr-only"
                aria-label="upload avatar image"
              />
            </div>
            <h2 className="Main--header--title username">killeraliens</h2>
          </div>
        </fieldset>
        <CountryRegionCityFormGroup updateCountryRegionCity={updateCountryRegionCity}/>
        <div className="form-controls">
          <button type="submit" disabled={formBody.cityName.error}>Submit</button>
          <Link to={`/dashboard/${context.user.id}`}>Cancel</Link>
        </div>
      </form>

    </div>
  )
}

export default withRouter(EditProfileForm)
