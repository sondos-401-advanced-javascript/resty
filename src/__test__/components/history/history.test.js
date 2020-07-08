import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';


import History from '../../../components/history/history';

describe('<History /> test tag if exists', () => {
    it('ul tag', () => {
        let app = shallow(<History />);
        expect(app.find('ul').exists()).toBeTruthy();
    });
 
    it('p tag', () => {
        let app = shallow(<History />);
        expect(app.find('p').exists()).toBeTruthy();
    });

});