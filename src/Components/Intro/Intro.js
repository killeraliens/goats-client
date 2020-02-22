import React from 'react';
import CentralContainer from '../CentralContainer/CentralContainer'

export default function Intro() {
  return(
    <CentralContainer>
      {/* <section> */}
        <h1>Welcome to Goat's Forum</h1>
        <h3>The place to post your punk - metal - grind flyers.</h3>
      {/* </section> */}
      {/* <section> */}
        <h3>If you know about an upcoming show, fest, or tour share the flyer here.</h3>
        <p>
          This is a DIY bulletin board for those of us who want more event information on the harder genres.
          We give you open-ended templates that allow you to upload artwork along with additional event details.
          If you want to copy/paste from an event already on Facebook, that would be a great way contribute to our forum.
        </p>
      {/* </section> */}
      {/* <section> */}
        <h3>View more artwork and events without having things filtered for you.</h3>
        <p>
          Find out about shows from an international community devoted to the genre, as they get posted.
          This is a private feed that relies on word-of-mouth sharing to get the right people posting the best content.
          Add more flyers. Tell others.
                </p>
      {/* </section> */}
      {/* <section> */}
        <h2>How it works.</h2>
        <br />
        <div>
          {/* <p>[<em>placeholder for Home community feed screenshot</em>]</p> */}
          <h3>
            Create an account to view & contribute to the community forum.
                  </h3>
        </div>
        <div>
          {/* <p>[<em>placeholder for Dashboard screenshot</em>]</p> */}
          <h3>
            Manage your profile appearance, account settings, past contributions
            from the dashboard
                  </h3>
        </div>
        <div>
          {/* <p>[<em>placeholder for Add Flyer screenshot</em>]</p> */}
          <h3>
            Post a flyer. Select from 'Single Show', 'Fest', or 'Tour' templates. Complete the form to make the flyer more searchable.
                  </h3>
        </div>
        <div>
          {/* <p>[<em>placeholder for delete flyer shot</em>]</p> */}
          <h3>
            Manage your public flyers (just delete for now) from dashboard or forum.
          </h3>
        </div>
      {/* </section> */}
    </CentralContainer>
  )
}
