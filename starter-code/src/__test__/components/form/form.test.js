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
    it('section results tag', () => {
        let app = shallow(<Form />);
        expect(app.find('.results').exists()).toBeTruthy();
    });
    it('span method tag', () => {
        let app = shallow(<Form />);
        expect(app.find('.method').exists()).toBeTruthy();
    });
    it('span url tag', () => {
        let app = shallow(<Form />);
        expect(app.find('.url').exists()).toBeTruthy();
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

describe('<Form /> in click', () => {
    it('input ', () => {
        let app = mount(<Form />);
        let input = app.find('input');
        let getSpan = app.find('#get');
        input.simulate('change', { target: { value: 'www.google.com' } });
        getSpan.simulate('click');
        expect(app.state('method')).toEqual('get');
        expect(app.state('url')).toEqual('www.google.com');
    });
    it('the output true', () => {
        let app = mount(<Form />);
        let button = app.find('button');
        let input = app.find('input');
        let getSpan = app.find('#get');
        input.simulate('change', { target: { value: 'www.google.com' } });
        getSpan.simulate('click');
        button.simulate('submit');
        expect(app.find('.method').text()).toContain('get');
        expect(app.find('.url').text()).toContain('www.google.com');
    });
    it('clear after submit', () => {
        let app = mount(<Form />);
        let button = app.find('button');
        let input = app.find('input');
        let getSpan = app.find('#delete');
        input.simulate('change', { target: { value: 'www.google.com' } });
        getSpan.simulate('click');
        button.simulate('submit');
        expect(app.state('method')).toEqual('');
        expect(app.state('url')).toEqual('');
    });
});

describe('snapshot style', () => {
    it('style of tree ', () => {
        const tree = renderer.create(<Form />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

