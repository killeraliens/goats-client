import React, { useContext, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppContext from '../../../AppContext';
import AvatarImageUpload from '../ImageUpload/AvatarImageUpload';
import './EditProfileForm.css';
import '../Forms.css';
import config from '../../../config'
import CountryRegionCityFormGroup from '../CountryCityMenu/CountryRegionCityFormGroup'


function EditProfileForm() {
  const context = useContext(AppContext)
  const [user, setUser] = useState(context.user)
  const [formBody, setFormBody] = useState({
    imgUrl: { value: '' },
    countryName: { value: '' },
    regionName: { value: '' },
    cityName: { value: '', error: '' }
  })


  const updateCountryRegionCity = (fields) => {
    setFormBody(prev => ({ ...prev, ...fields }))
  }

  const updateImgUrl = (images) => {
    console.log('Images', images)
  }

  return(
    <div className="Main--content no-margin">
      <form className="EditProfileForm header-form">
        <AvatarImageUpload user={user} updateImgUrl={updateImgUrl}/>
        {/* <fieldset>
          <div className="flex-center-between">
            <div className="ImageFileButton">
              <label htmlFor="imgUrl">
                <Avatar
                  className="Main--avatar"
                  imgUrl={user.imgUrl}
                  username={user.username}
                >
                  <span>+IMAGE</span>
                </Avatar>
              </label>
              <input
                type="file"
                id="imgUrl"
                name="imgUrl"
                className="sr-only"
                aria-label="select image"
                onChange={handleImgUrlChange}
              />
            </div>
            <h1 className="Main--header--title username">{user.username}</h1>
          </div>
        </fieldset> */}
        <CountryRegionCityFormGroup updateCountryRegionCity={updateCountryRegionCity}/>
        <div className="form-controls">
          <button type="submit" disabled={formBody.cityName.error}>Submit</button>
          <Link to={`/dashboard/${user.id}`}>Cancel</Link>
        </div>
      </form>
    </div>
  )
}

export default withRouter(EditProfileForm)
