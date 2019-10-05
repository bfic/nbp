/* eslint-env jest */

import { shallow, mount } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'
import { Index } from '../pages/index.js'
import { Favourites } from '../components/Favourites.js'
import { Courses } from '../components/Courses.js'
import { AvailableCodes } from '../components/AvailableCodes.js'

describe('1. Components has specific titles', () => {
  it('Index page shows h1 "NBP Favourite Courses App"', () => {
    const index = shallow(<Index />)
    expect(index.find('h1').text()).toEqual('NBP Favourite Courses App')
  })

  it('Courses component shows h2 "NBP Courses for favourite currencies:"', () => {
    const courses = shallow(<Courses />)
    expect(courses.find('h2').text()).toEqual('NBP Courses for favourite currencies:')
  })

  it('Favourites component shows h2 "Favourite currencies:"', () => {
    const favourites = shallow(<Favourites favouriteCurrencies={[]} />)
    expect(favourites.find('h2').text()).toEqual('Favourite currencies:')
  })

})

describe('2. Favourites shows favouriteCurrencies from props', () => {
 const favourites = ['EUR', 'JPY', 'GBP', 'NOK'];
  const fav = shallow(<Favourites favouriteCurrencies={favourites} />)
  favourites.forEach(code => {
    it(`includes code ${code} on the list`, () => {
      expect(fav.containsMatchingElement(<span>{ code }</span>)).toEqual(true)
    });
  })
})

describe('3. Favourites change props', () => {
	// React doesn't support batched updates on ShallowRendering from v16.
 	const favourites = ['EUR', 'JPY', 'GBP', 'NOK'];
	const fav = shallow(<Favourites favouriteCurrencies={[]} />)
  fav.setProps({favouriteCurrencies: favourites });
  favourites.forEach(code => {
    it(`includes code ${code} on the list`, () => {
  		expect(fav.containsMatchingElement(<span>{ code }</span>)).toEqual(true)
    });
  });
});

describe('4. Courses component showing spinner when courses are loading', () => {
  it(`successfully showing spinner during loading`, () => {
    const courses = shallow(<Courses />)
    courses.setState({loading: true });
    // Check if div.loading exists after mocking state
    expect(courses.find('div.loading')).toBeTruthy();
	});
});

describe('5. Courses component showing courses list when courses are loaded', () => {
	const coursesList = [
		{
			code: 'JPY',
			course: 0.037024

		},
		{
			code: 'GBP',
			course: 4.8832
		},
		{
			code: 'NOK',
			course: 0.434
		},
		{
			code: 'CHF',
			course: 3.9694
		},
	];
  const courses = shallow(<Courses />)
  courses.setState({
  	loading: false,
  	courses: coursesList
  });
  // Check if list of coursed exists after mocking state
  coursesList.forEach(course => {
    it(`successfully showing course item for ${course.code}`, () => {
    		expect(courses.containsMatchingElement(<div>{ course.code }</div>)).toEqual(true)
    });
  });
});

/* Here we have 'await/async resolve' pattern, because we want to check continuously whether 
element are successfully fetched through api */
function test6HelperFunction(courses) {
  return new Promise(resolve => {
  	const limit = 10;
  	let i = 0;
    setInterval(() => {
    	const ret = expect(courses.find('div.courses-wrapper').find('div.courses-box')).StoBeTruthy();
    	if (ret === true || i === limit) {
      	resolve();
    	}
    	i++;
    }, 200);
  });
}

async function test6ValidateResponse(courses) {
  const ret = await test6HelperFunction(courses);
}

// Here we are using simulate to test interactions
describe('6. Courses after clicking on Load more button should trigger loading and display div.courses-box', () => {
	it('displays div.courses-box after clicking on a button and waiting some time', () => {
    const courses = shallow(<Courses />)

    // We need to mock favouriteCurrencies here
 		const favourites = ['EUR', 'JPY', 'GBP', 'NOK'];
  	courses.setProps({favouriteCurrencies: favourites });

	  courses.find('a.load-courses').simulate('click')
	  test6ValidateResponse(courses)
	});
});

// Validation
describe('7. Invalid code name trigger displaying popup', () => {
  const favouritesArray = ['JPY'];
  const favourites = mount(<Favourites favouriteCurrencies={favouritesArray} />)
  const availableCodes = [
  	{ code: 'GBP', currency: 'British Pound'},
  	{ code: 'EUR', currency: 'Euro'},
  	{ code: 'NOK', currency: 'Norway crown'},
  ];
  favourites.setProps({
  	availableCodes:availableCodes,
  })

  const arr = ['PLN', 'OOP', 'JPY'];
  arr.forEach(code => {
	  it(`successfully showing skylight-dialog after trying to submit wrong code ${code}`, () => {
	    favourites.setState({inputValue: code });
		  favourites.find('.add-favourite').simulate('keypress', {key: 'Enter'})

		  if (code == 'PLN') {
				expect(
					favourites.find('div.favourites-wrapper').find('div.skylight-dialog').find('div.content').text()
				).toEqual('It is NBP courses so PLN to PLN ? Makes no sense...');
		  } else if (code === 'OOP') {
				expect(
					favourites.find('div.favourites-wrapper').find('div.skylight-dialog').find('div.content').text()
				).toEqual('This code is invalid currency code');
		  } else if (code === 'JPY') {
				expect(
					favourites.find('div.favourites-wrapper').find('div.skylight-dialog').find('div.content').text()
				).toEqual('Code is already added to favourites');
		  }
		});
	});
});

describe('8. AvailableCodes displays codes', () => {
  const availableCodes = [
  	{ code: 'GBP', currency: 'British Pound'},
  	{ code: 'EUR', currency: 'Euro'},
  	{ code: 'NOK', currency: 'Norway crown'}
  ];
	const acodescomp = shallow(<AvailableCodes availableCodes={availableCodes} />);

	availableCodes.forEach(code => {
		const c = code.code;
	  it('AvailableCodes shows ' + c, () => {
	    expect(
	    	acodescomp.containsMatchingElement({c})
	    ).toEqual(true)
	  })
	})
});
