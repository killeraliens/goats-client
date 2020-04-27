import React from 'react';
import CentralContainer from '../CentralContainer/CentralContainer'
import { Link } from 'react-router-dom'
import './Intro.css'
import Mailto from 'react-protected-mailto'

export default function Intro() {
  return(
    <CentralContainer >
      <div className='Intro intro-about-container'>
        <h1>UNHOLYGRAIL</h1>
      <br />
      <section>
        <h3>Upcoming shows and event flyer archive.</h3>
        <p>
            This is a DIY bulletin board for poster artwork and event information.
            If you want to copy/paste from an event already on Facebook or upload an old flier,
            that would be a great way to contribute.
        </p>
        <p>
          View more artwork and upcoming events from an international scope, as they get posted.
          Archive digital references to fliers and shows from your past.
        </p>
        <div className='center-button-container'>
          <Link to='/public/signup' className='ActionButton'>Sign up</Link>
        </div>
      </section>
      <br />
      <section>
        <h3>How it works</h3>
        <div className="flex-bullets">
          <p style={{marginTop: '0px'}}>
              <Link to='/public/signup' >Create an account</Link> or <Link to='/public/signin'>Sign In</Link> to view and share fliers.
              Forgot your password? <Link to='/public/recover'>Recover Password</Link>.
          </p>
        </div>
        <div className="flex-bullets">
          <p>
            Manage your profile appearance, account settings, past contributions from your dashboard.
          </p>
        </div>
        <div className="flex-bullets">
          <p>
            Post a flier. Select from 'Single Show', 'Fest', or 'Tour' templates. Complete the form to make it more searchable.
          </p>
        </div>
        <div className="flex-bullets">
          <p>
              Keep your fliers and their events updated.
              Cancel all tourstops or event dates affected.
              Cancelling all events on a flier will show a notification tag on the public flier.
          </p>
        </div>
          <div className="flex-bullets">
            <p>
              Deleting one of your fliers will remove it from the database.
              Admin level accounts reserve the right to modify or remove fliers with irrelevant or dangerous content.
          </p>
          </div>
        <div className="flex-bullets">
          <p>
            Watch for new features like comments, sorting, and stars.
            Contact  <Mailto
              email='admin@unholygrail.org'
              headers={
                { subject: 'Suggestions' }
              }
            /> with suggestions for features you would like to see added.
          </p>
        </div>
      </section>

      </div>
    </CentralContainer>
  )
}
