import React from 'react';
import CentralContainer from '../CentralContainer/CentralContainer'
import { Link } from 'react-router-dom'
import Sword from '../Sword/Sword'
import flourish from '../../assets/flourish.svg'
import './Intro.css'
import Mailto from 'react-protected-mailto'

export default function Intro() {
  return(
    <CentralContainer>
        <h1>Goat's Forum</h1>
      <br />
      <section>
        <h3>If you know about an upcoming concert, festival, or tour share the flyer here.</h3>
        <p>
          This is a DIY bulletin board for poster artwork and event information.
          If you want to copy/paste from an event already on Facebook,
          that would be a great way contribute to our forum.
        </p>
        <p>
        View more artwork and events from an international scope, as they get posted.
          This is a private feed that relies on word-of-mouth sharing to get people posting the best content.
          {<b><Link to='/public/signup'>{' '}Sign up</Link></b>}, post some local flyers. Tell others.
        </p>
      </section>
      <br />
      <section>
        <h3>How it works.</h3>
        <div className="flex-bullets">
          {/* <p>[<em>placeholder for Home community feed screenshot</em>]</p> */}
          {/* <img src={flourish} className='flourish'/> */}
          <p>
            <b><Link to='/public/signup'>Create an account</Link></b> to view posted content & contribute to the community forum.
          </p>
        </div>
        <div className="flex-bullets">
          {/* <p>[<em>placeholder for Dashboard screenshot</em>]</p> */}
          <img src={flourish} className='flourish' />
          <p>
            Manage your profile appearance, account settings, past contributions from your dashboard.
          </p>
        </div>
        <div className="flex-bullets">
          {/* <p>[<em>placeholder for Add Flyer screenshot</em>]</p> */}
          <img src={flourish} className='flourish' />
          <p>
            Post a flyer. Select from 'Single Show', 'Fest', or 'Tour' templates. Complete the form to make the flyer more searchable.
          </p>
        </div>
        <div className="flex-bullets">
          {/* <p>[<em>placeholder for delete flyer shot</em>]</p> */}
          <img src={flourish} className='flourish' />
          <p>
            Update or delete any flyers you've posted from your dashboard or public forum.
          </p>
        </div>
        <div className="flex-bullets">
          {/* <p>[<em>placeholder for delete flyer shot</em>]</p> */}
          <img src={flourish} className='flourish' />
          <p>
            Watch for new features like comments, sorting, and stars.
            Contact  <Mailto
              email='goatsforum@gmail.com'
              headers={
                { subject: 'Suggestion' }
              }
            /> with suggestions for features you would like to see added.
          </p>
          {/* <img src={flourish} className='flourish' /> */}
        </div>
      </section>
    </CentralContainer>
  )
}
