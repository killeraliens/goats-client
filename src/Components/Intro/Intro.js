import React from 'react';
import CentralContainer from '../CentralContainer/CentralContainer'
import { Link } from 'react-router-dom'
import Sword from '../Sword/Sword'
import flourish from '../../assets/flourish.svg'
import './Intro.css'
import Mailto from 'react-protected-mailto'

export default function Intro() {
  return(
    <CentralContainer >
      <div className='Intro intro-about-container'>
        <h1>Goat's Guide</h1>
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
              <Link to='/public/signup' >Create an account</Link> to view and share fliers.
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
            Update or delete any posts from your dashboard or the public feed.
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
