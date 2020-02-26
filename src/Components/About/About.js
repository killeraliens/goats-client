import React from 'react';
import CentralContainer from '../CentralContainer/CentralContainer'
import Mailto from 'react-protected-mailto'

export default function About() {
  return (
    <CentralContainer>
      <section>
        <h1>About</h1>
        <p>
          This is a community forum where you can post flyer artwork
          and other relevant information for live tours and concerts.
        </p>
        <p>
          Your personal account information will never be shared,
          but the things you post on here will be visible to other members.
          For now, this site will somewhat moderated by me.
          If you post non-relevant material I may clean it up without telling you.
        </p>
        <p>
          This project is in testing and development mode and it needs people like you to sign up and post content.
          If you are interested becoming a moderator in the future, email me. Also please send any errors, questions, or general improvements to
          {' '}
          <Mailto
            email='goatsforum@gmail.com'
            // headers={
            //   { subject: 'General' },
            //   { cc: 'friend@coston.cool' }
            // }
          />
          {' '}
          - Ali
        </p>
      </section>
    </CentralContainer>
  )
}
