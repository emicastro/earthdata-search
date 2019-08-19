import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import GranuleFiltersList from '../GranuleFiltersList'

Enzyme.configure({ adapter: new Adapter() })

function setup() {
  const props = {
    children: <div className="test" />
  }

  const enzymeWrapper = shallow(<GranuleFiltersList {...props} />)

  return {
    enzymeWrapper,
    props
  }
}

describe('GranuleFiltersList component', () => {
  test('renders itself correctly', () => {
    const { enzymeWrapper } = setup()

    expect(enzymeWrapper.type()).toBe('ul')
  })

  test('is passed a child', () => {
    const { enzymeWrapper } = setup()

    expect(enzymeWrapper.find('div.test').length).toEqual(1)
  })
})
