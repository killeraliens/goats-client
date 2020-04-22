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
            If you post non-relevant material I may delete it without telling you.
          </p>
          <p>
            Send any errors, questions, or general improvements to
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
