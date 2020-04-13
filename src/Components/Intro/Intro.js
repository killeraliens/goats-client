import React from 'react';
import CentralContainer from '../CentralContainer/CentralContainer'
import { Link } from 'react-router-dom'
import './Intro.css'
import Mailto from 'react-protected-mailto'

export default function Intro() {
  return(
    <CentralContainer >
      <div className='Intro intro-about-container'>
        <h1>Goats' Guide</h1>
      <br />
      <section>
        <h3>If you know about an upcoming concert, festival, or tour share the flier here.</h3>
        <p>
          This is a DIY bulletin board for poster artwork and event information.
          If you want to copy/paste from an event already on Facebook,
          that would be a great way contribute.
        </p>
        <p>
          View more artwork and events from an international scope, as they get posted.
          Create an account, post some local fliers. Tell others.
        </p>
        <div className='center-button-container'>
          <Link to='/public/signup' className='ActionButton'>Sign up</Link>
          {/* <Link to='/public/signup' className='MainNavLink green-white'><b>Sign up</b></Link> */}
        </div>
      </section>
      <br />
      <section>
        <h3>How it works</h3>
        <div className="flex-bullets">
          {/* <p>[<em>placeholder for Home community feed screenshot</em>]</p> */}
          {/* <img src={flourish} className='flourish'/> */}
          <p style={{marginTop: '0px'}}>
              <Link to='/public/signup' >Create an account</Link> or <Link to='/public/signin'>Sign In</Link> to view and share fliers.
              Forgot your password? There's a link for that. <Link to='/public/recover'>Recover Password</Link>
          </p>
        </div>
        <div className="flex-bullets">
          {/* <p>[<em>placeholder for Dashboard screenshot</em>]</p> */}
          {/* <img src={flourish} className='flourish' /> */}
          <p>
            Manage your profile appearance, account settings, past contributions from your dashboard.
          </p>
        </div>
        <div className="flex-bullets">
          {/* <p>[<em>placeholder for Add Flier screenshot</em>]</p> */}
          {/* <img src={flourish} className='flourish' /> */}
          <p>
            Post a flier. Select from 'Single Show', 'Fest', or 'Tour' templates. Complete the form to make it more searchable.
          </p>
        </div>
        <div className="flex-bullets">
          {/* <p>[<em>placeholder for delete flier shot</em>]</p> */}
          {/* <img src={flourish} className='flourish' /> */}
          <p>
              Keep your fliers and their events updated.
              Cancel all tourstops or event dates affected.
              Cancelling all events on a flier will show a notification tag on the public flier.
          </p>
        </div>
          <div className="flex-bullets">
            {/* <p>[<em>placeholder for delete flier shot</em>]</p> */}
            {/* <img src={flourish} className='flourish' /> */}
            <p>
              Deleting one of your fliers will remove it from the database.
              Admin level accounts reserve the right to modify or remove fliers with irrelevant or dangerous content.
          </p>
          </div>
        <div className="flex-bullets">
          {/* <p>[<em>placeholder for delete flier shot</em>]</p> */}
          {/* <img src={flourish} className='flourish' /> */}
          <p>
            Watch for new features like comments, sorting, and stars.
            Contact  <Mailto
              email='goatsguide@gmail.com'
              headers={
                { subject: 'Suggestion' }
              }
            /> with suggestions for features you would like to see added.
          </p>
          {/* <img src={flourish} className='flourish' /> */}
        </div>
      </section>

      </div>
    </CentralContainer>
  )
}
