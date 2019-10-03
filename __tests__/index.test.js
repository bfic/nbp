/* eslint-env jest */

import { shallow } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'

import { Index } from '../pages/index.js'

describe('With Enzyme', () => {
  it('App shows "Batman TV Shows"', () => {
    const index = shallow(<Index shows={ [] } />)

    expect(index.find('h1').text()).toEqual('Batman TV Shows')
  })
})

describe('With Snapshot Testing', () => {
  it('App shows "Batman TV Shows"', () => {
  	const obj = {
  		externals: {tvrage: 2719, thetvdb: 77871, imdb: "tt0059968"},
		genres: ["Comedy", "Action", "Adventure"],
		id: 975,
		image: {medium: "http://static.tvmaze.com/uploads/images/medium_portrait/6/16463.jpg", original: "http://static.tvmaze.com/uploads/images/original_untouched/6/16463.jpg"},
		language: "English",
		name: "Batman",
		network: {id: 3, name: "ABC", country: {}},
		officialSite: null,
		premiered: "1966-01-12",
		rating: {average: 8},
		runtime: 30,
		schedule: {time: "19:30", days: Array(1)},
		status: "Ended",
		summary: "<p>Wealthy entrepreneur Bruce Wayne and his ward Dick Grayson lead a double life: they are actually crime fighting duo Batman and Robin. A secret Batpole in the Wayne mansion leads to the Batcave, where Police Commissioner Gordon often calls with the latest emergency threatening Gotham City. Racing to the scene of the crime in the Batmobile, Batman and Robin must (with the help of their trusty Bat-utility-belt) thwart the efforts of a variety of master criminals, including Catwoman, Egghead, The Joker, King Tut, The Penguin, and The Riddler.</p>",
		type: "Scripted",
		updated: 1567796826,
		url: "http://www.tvmaze.com/shows/975/batman",
		webChannel: null,
		weight: 82,
  	}
    const component = renderer.create(<Index shows={ [obj] }  />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
