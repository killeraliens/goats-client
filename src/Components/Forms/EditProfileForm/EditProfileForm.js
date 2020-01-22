import React, { useContext, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppContext from '../../../AppContext';
import Avatar from '../../Avatar/Avatar';
import './EditProfileForm.css';
import '../Forms.css';
import CountryRegionFormGroup from '../CountryCityMenu/CountryRegionFormGroup'


function EditProfileForm() {
  const [countryName, setCountryName] = useState({ value: ''})
  const [regionName, setRegionName] = useState({ value: ''})
  const context = useContext(AppContext)

  const updateCountryRegion = ({ countryName, regionName }) => {
    setCountryName(countryName)
    setRegionName(regionName)
    // console.log(`Updated country ${countryName.value}, region ${regionName.value}`)
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
        <div className="fieldset-container">
          <div className="fieldset-container sub-group">
            <p>{countryName + ', ' + regionName}</p>
            <CountryRegionFormGroup updateCountryRegion={updateCountryRegion}/>
          </div>
          <fieldset className="grow">
            <label htmlFor="city">City</label>
            <input id="city" name="city" type="text"/>
          </fieldset>
        </div>
        <div className="form-controls">
          <button type="submit">Submit</button>
          <Link to={`/dashboard/${context.user.id}`}>Cancel</Link>
        </div>
      </form>

    </div>
  )
}

export default withRouter(EditProfileForm)
