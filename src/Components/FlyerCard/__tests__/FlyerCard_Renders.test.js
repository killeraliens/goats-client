import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import FlyerCard from '../FlyerCard';

describe('FlyerCard component', () => {
  it('renders correctly', () => {

    render(
      <BrowserRouter>
      <FlyerCard isEdit={false} flyer={{
        id: '',
        creator_id: '',
        flyer_type: 'Tour',
        image_url: '',
        headline: '',
        bands: '',
        details: '',
        publish_comment: '',
        listing_state: 'Public',
        created: '',
        modified: '',
        creator_username: '',
        creator_image_url: '',
        events: [
          {
            id: '',
            flyer_id: '',
            event_date: '',
            venue_name: '',
            city_name: '',
            region_name: '',
            country_name: '',
            city_id: null,
            cancelled: false
          }
        ]
      }}/>
      </BrowserRouter>
    );

  })
})