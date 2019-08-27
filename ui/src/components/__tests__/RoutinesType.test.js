import React from 'react';
import { mount } from 'enzyme';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import RoutinesType from '../pages/RoutinesType';
import reducers from '../../reducers';

let wrapped;

beforeEach(() => {
    wrapped= mount(
        <Provider store={createStore(reducers)}>
            <RoutinesType/>
        </Provider>
    );
});

afterEach(() => {
    wrapped.unmount();
});

it('botones de ejercicios', () => {
    expect(wrapped.find('button').length).toEqual(7);
});
