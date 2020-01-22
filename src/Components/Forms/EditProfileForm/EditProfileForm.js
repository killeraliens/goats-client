import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppContext from '../../../AppContext';
import Avatar from '../../Avatar/Avatar';
import './EditProfileForm.css';
import '../Forms.css';
import defaultAvatar from '../../../assets/default-avatar.jpg'


function EditProfileForm() {
  const context = useContext(AppContext)
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
            <fieldset className="grow">
              <label htmlFor="country">Country</label>
              <select id="country" name="country" type="text">
                <option value="US">United States</option>
              </select>
            </fieldset>
            <fieldset className="no-shrink">
              <label htmlFor="region">Region</label>
              <select id="region" name="region" type="text">
                <option value="AZ">AZ</option>
              </select>
            </fieldset>
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
