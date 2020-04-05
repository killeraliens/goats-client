import React from 'react';
import CentralContainer from '../CentralContainer/CentralContainer'
import Mailto from 'react-protected-mailto'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <CentralContainer >
      <div className="About intro-about-container">
        <section>
          <h1>About</h1>
          <p>
            This is a community bulletin where you can post flier artwork
            and other relevant information for live tours and concerts.
          </p>
          <p>
            Your personal account information will never be shared,
            but the things you post on here will be visible to other members.
            Until a flagging feature is up, this site will be somewhat moderated by me.
            If you post non-relevant material I may clean it up without telling you.
          </p>
          <p>
            Certain account features like updating your email are not yet available.
            Until additional features are up, you can email me with specific account requests.
          </p>
          <p>
            This project is in testing and development mode and it needs people like you to sign up and post content.
            If you are interested becoming a moderator in the future, email me. Send any errors, questions, or general improvements to
            {' '}
            <Mailto
              email='goatsguide@gmail.com'
              // headers={
              //   { subject: 'General' },
              //   { cc: 'friend@coston.cool' }
              // }
            />
            {/* {' '}
            - Ali */}
          </p>
        </section>

      </div>
    </CentralContainer>
  )
}
