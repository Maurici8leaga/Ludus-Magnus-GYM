import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import Header from '../Header';

let wrapped;

beforeEach(() => {
    wrapped = shallow(<App/>);
});

it('muestrame el header', () => {
    expect(wrapped.find(Header).length).toEqual(1);
});