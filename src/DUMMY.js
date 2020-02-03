// MENTOR QUESTION: react-dom.development.js:2311 Mixed Content:
// The page at 'https://localhost:3000/forum' was loaded over HTTPS,
// but requested an insecure image 'http://www.brooklynvegan.com/files/2019/11/75521841_2571097956311369_9029394387301302272_o1.jpg?w=630'.
// This content should also be served over HTTPS.
// How do i deal with people inserting named links? can i instruct them in the forms to use MD [](),
// or what about links that are not HTTPS? validation/text formatting for db storage.
export default {
  "users": [
    {
      "id": "3",
      "username": "killeraliens",
      "admin": "false",
      "email": "killeraliens@outlook.com",
      "image_url": "",
      "created": "2020-01-07T17:47:15.309Z",
      "last_login": "2020-02-03T03:37:42.336Z",
      "city_name": "",
      "region_name": "",
      "country_name": ""
    },
    {
      "id": "666",
      "username": "devilmaster",
      "admin": "false",
      "email": "devilmaster@sampleemail.com",
      "image_url": "https://media2.fdncms.com/sacurrent/imager/u/original/17106401/devils_3_legend_production_company.jpg",
      "created": "2019-01-03T00:00:00.000Z",
      "last_login": "2019-01-03T18:00:00.000Z",
      "city_name": "Copenhagen",
      "region_name": "",
      "country_name": "Denmark"
    },
    {
      "id": "5",
      "username": "demonbaby",
      "admin": "false",
      "email": "devilmaster@sampleemail.com",
      "image_url": "",
      "created": "2019-01-03T00:00:00.000Z",
      "last_login": "2019-01-03T18:00:00.000Z",
      "city_name": "Copenhagen",
      "region_name": "",
      "country_name": "Denmark"
    },
    {
      "id": "667",
      "username": "greyalien",
      "admin": "false",
      "email": "greyalien@sampleemail.com",
      "image_url": "https://www.newshub.co.nz/dam/form-uploaded-images/roswell-ufo-alien-CREDIT-GETTY-1120.jpg",
      "created": "2019-01-05T19:22:00.000Z",
      "last_login": "2019-01-05T20:42:00.000Z",
      "city_name": "Ghent",
      "region_name": "LUX",
      "country_name": "Belgium"
    }
  ],

  "flyers": [
    {
      "id": "1",
      "creator_id": "666",
      "type": "Fest",
      "image_url": "https://lastfm.freetls.fastly.net/i/u/ar0/02164795f45ff2dfd34bbc06c584bcb2.webp",
      "headline": "Total Death Over Mexico lll",
      "created": "2019-01-03T16:00:00.000Z",
      "modified": "2019-01-03T16:00:00.000Z",
      "bands": "",
      "details": "Foro San Rafael Av. Ribera de San Cosme #28, 06470 Mexico City, Mexico https://www.facebook.com/events/foro-san-rafael/total-death-over-mexico-lll-informativo/1004824666540845/",
      "publish_comment": "could someone comment with an official list of bands?",
      "listing_state": "Public"
    },
    {
      "id": "2",
      "creator_id": "667",
      "type": "Tour",
      "image_url": "http://www.brooklynvegan.com/files/2019/11/75521841_2571097956311369_9029394387301302272_o1.jpg?w=630",
      "headline": "RIPPIKOULU / CHTHE’ILIST / NUCLEUS — 2020 North American Tour",
      "created": "2019-01-05T19:42:00.000Z",
      "modified": "2019-01-05T19:42:00.000Z",
      "bands": "RIPPIKOULU, CHTHE’ILIST, NUCLEUS",
      "details": "Read More: Finnish death doom vets Rippikoulu touring with Chthe’ilist & Nucleus | http://www.brooklynvegan.com/finnish-death-doom-vets-rippikoulu-touring-with-chtheilist-nucleus/?trackback=tsmclip",
      "publish_comment": "Found this on [Brooklyn Vegan](http://www.brooklynvegan.com/finnish-death-doom-vets-rippikoulu-touring-with-chtheilist-nucleus/)",
      "listing_state": "Public"
    },
    {
      "id": "3",
      "creator_id": "3",
      "type": "Fest",
      "image_url": "https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-9/81886107_2710011682400996_3673221855931531264_o.jpg?_nc_cat=109&_nc_ohc=7ZAgDasafVUAX9nfoil&_nc_ht=scontent-lax3-1.xx&oh=6d8ac1b747afa31ae57800526791a2ae&oe=5ED59271",
      "headline": "Killtown Deathfest VIII - '10 Years of Death'",
      "created": "2020-01-23T21:42:14.355Z",
      "modified": "2020-01-23T21:42:14.355Z",
      "bands": "Lineup TBA",
      "details": "Pumpehuset Studiestræde 52, 1554 Copenhagen https://www.facebook.com/events/2806422816089129/",
      "publish_comment": "",
      "listing_state": "Public"
    },
    {
      "id": "4",
      "creator_id": "3",
      "type": "Show",
      "image_url": "https://scontent.fphx1-1.fna.fbcdn.net/v/t1.0-9/s960x960/82800556_3011524808871060_725602104382586880_o.jpg?_nc_cat=108&_nc_ohc=DaSe5IYE6wAAX_3DIsb&_nc_ht=scontent.fphx1-1.fna&_nc_tp=1002&oh=ed634099a0449411603897f9b8cab3eb&oe=5E974A0E",
      "headline": "Antichrist Siege Machine (ASM) with Bloodlust and more",
      "created": "2020-01-23T22:42:14.355Z",
      "modified": "2020-01-23T22:42:14.355Z",
      "bands": "ASM  - War Metal from Richmond https://stygianblackhand.bandcamp.com/album/schism-perpetration, BLOODLUST https://bloodlustphx.bandcamp.com/album/bloodlust, and more...",
      "details": "$10 at the door, CASH ONLY, more info soon",
      "publish_comment": "more info soon",
      "listing_state": "Public"
    }
  ],

  "events": [
    {
      "id": "1",
      "flyer_id": "1",
      "date": "2020-03-13T00:00:00.000Z",
      "venue_name": "Foro San Rafael",
      "modified": "2019-01-03T16:00:00.000Z",
      "city_name": "Mexico City",
      "region_name": "",
      "country_name": "Mexico"
    },
    {
      "id": "2",
      "flyer_id": "1",
      "date": "2020-03-14T00:00:00.000Z",
      "venue_name": "Foro San Rafael",
      "modified": "2019-01-03T16:00:00.000Z",
      "city_name": "Mexico City",
      "region_name": "",
      "country_name": "Mexico"
    },
    {
      "id": "3",
      "flyer_id": "1",
      "date": "2020-03-15T00:00:00.000Z",
      "venue_name": "Foro San Rafael",
      "modified": "2019-01-03T16:00:00.000Z",
      "city_name": "Mexico City",
      "region_name": "",
      "country_name": "Mexico"
    },
    {
      "id": "4",
      "flyer_id": "1",
      "date": "2020-03-16T00:00:00.000Z",
      "venue_name": "Foro San Rafael",
      "modified": "2019-01-03T16:00:00.000Z",
      "city_name": "Mexico City",
      "region_name": "",
      "country_name": "Mexico"
    },
    {
      "id": "5",
      "flyer_id": "2",
      "date": "2020-04-03T00:00:00.000Z",
      "venue_name": "Maple Grove Tavern",
      "modified": "2019-01-05T19:42:00.000Z",
      "city_name": "Clevland",
      "region_name": "OH",
      "country_name": "United States"
    },
    {
      "id": "6",
      "flyer_id": "2",
      "date": "2020-04-04T00:00:00.000Z",
      "venue_name": "TBD",
      "modified": "2019-01-05T19:42:00.000Z",
      "city_name": "Detroit",
      "region_name": "MI",
      "country_name": "United States"
    },
    {
      "id": "7",
      "flyer_id": "2",
      "date": "2020-04-05T00:00:00.000Z",
      "venue_name": "Cobra Lounge",
      "modified": "2019-01-05T19:42:00.000Z",
      "city_name": "Chicago",
      "region_name": "IL",
      "country_name": "United States"
    },
    {
      "id": "8",
      "flyer_id": "2",
      "date": "2020-04-06T00:00:00.000Z",
      "venue_name": "Black Circle Brewing",
      "modified": "2019-01-05T19:42:00.000Z",
      "city_name": "Indianapolis",
      "region_name": "IN",
      "country_name": "United States"
    },
    {
      "id": "9",
      "flyer_id": "2",
      "date": "2020-04-07T00:00:00.000Z",
      "venue_name": "TBD",
      "modified": "2019-01-05T19:42:00.000Z",
      "city_name": "Columbus",
      "region_name": "OH",
      "country_name": "United States"
    },
    {
      "id": "10",
      "flyer_id": "2",
      "date": "2020-04-08T00:00:00.000Z",
      "venue_name": "Cativo's",
      "modified": "2019-01-05T19:42:00.000Z",
      "city_name": "Pittsburgh",
      "region_name": "PA",
      "country_name": "United States"
    },
    {
      "id": "11",
      "flyer_id": "2",
      "date": "2020-04-09T00:00:00.000Z",
      "venue_name": "Metro Gallery",
      "modified": "2019-01-05T19:42:00.000Z",
      "city_name": "Baltimore",
      "region_name": "MD",
      "country_name": "United States"
    },
    {
      "id": "12",
      "flyer_id": "2",
      "date": "2020-04-10T00:00:00.000Z",
      "venue_name": "Kung Fu Necktie",
      "modified": "2019-01-05T19:42:00.000Z",
      "city_name": "Philadelphia",
      "region_name": "PA",
      "country_name": "United States"
    },
    {
      "id": "13",
      "flyer_id": "2",
      "date": "2020-04-11T00:00:00.000Z",
      "venue_name": "Saint Vitus",
      "modified": "2019-01-05T19:42:00.000Z",
      "city_name": "New York",
      "region_name": "NY",
      "country_name": "United States"
    },
    {
      "id": "14",
      "flyer_id": "2",
      "date": "2020-04-12T00:00:00.000Z",
      "venue_name": "Piranha Bar",
      "modified": "2019-01-05T19:42:00.000Z",
      "city_name": "Montreal",
      "region_name": "QC",
      "country_name": "Canada"
    },
    {
      "id": "15",
      "flyer_id": "3",
      "date": "2020-09-03T00:00:00.000Z",
      "venue_name": "Pumpehuset",
      "modified": "2020-01-23T21:42:14.355Z",
      "city_name": "Copenhagen",
      "region_name": "",
      "country_name": "Denmark"
    },
    {
      "id": "16",
      "flyer_id": "3",
      "date": "2020-09-04T00:00:00.000Z",
      "venue_name": "Pumpehuset",
      "modified": "2020-01-23T21:42:14.355Z",
      "city_name": "Copenhagen",
      "region_name": "",
      "country_name": "Denmark"
    },
    {
      "id": "17",
      "flyer_id": "3",
      "date": "2020-09-05T00:00:00.000Z",
      "venue_name": "Pumpehuset",
      "modified": "2020-01-23T21:42:14.355Z",
      "city_name": "Copenhagen",
      "region_name": "",
      "country_name": "Denmark"
    },
    {
      "id": "18",
      "flyer_id": "3",
      "date": "2020-09-06T00:00:00.000Z",
      "venue_name": "Pumpehuset",
      "modified": "2020-01-23T21:42:14.355Z",
      "city_name": "Copenhagen",
      "region_name": "",
      "country_name": "Denmark"
    },
    {
      "id": "19",
      "flyer_id": "4",
      "date": "2020-04-16T00:00:00.000Z",
      "venue_name": "MASTER'S CHAMBERS",
      "modified": "2020-01-23T22:42:14.355Z",
      "city_name": "Phoenix",
      "region_name": "AZ",
      "country_name": "United States"
    }
  ]
}