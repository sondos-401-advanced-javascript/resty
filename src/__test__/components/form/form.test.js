import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';


import Form from '../../../components/form/form';

describe('<Form /> test tag if exists', () => {
    it('span tag', () => {
        let app = shallow(<Form />);
        expect(app.find('span').exists()).toBeTruthy();
    });
    it('input tag', () => {
        let app = shallow(<Form />);
        expect(app.find('input').exists()).toBeTruthy();
    });
    it('button tag', () => {
        let app = shallow(<Form />);
        expect(app.find('button').exists()).toBeTruthy();
    });

    it('span method tag', () => {
        let app = shallow(<Form />);
        expect(app.find('.methods').exists()).toBeTruthy();
    });

    it('method get span tag', () => {
        let app = shallow(<Form />);
        expect(app.find('#get').exists()).toBeTruthy();
    });
    it('method delete span tag', () => {
        let app = shallow(<Form />);
        expect(app.find('#delete').exists()).toBeTruthy();
    });
    it('method put span tag', () => {
        let app = shallow(<Form />);
        expect(app.find('#put').exists()).toBeTruthy();
    });
});



