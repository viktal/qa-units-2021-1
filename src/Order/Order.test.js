import React from 'react'

import {configure, shallow} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import Order from "./Order";
import {fakeOrders} from "../data/fakeOrders";

jest.mock('../utils/getDate')


const fakeDate = 123;
import {getDate} from '../utils/getDate';

configure({adapter: new Adapter()});


describe('Order.js', () => {

    beforeEach(() => {
        getDate.mockReturnValue(fakeDate);
    });

    afterEach(() => {
        jest.resetModules();
    });

    it('render empty', () => {
        const wrapper = shallow(<Order/>);
        expect(wrapper).toEqual({});
    });

    it('render with data', () => {
        const wrapper = shallow(<Order order={{shop: "test", date: 1}}/>);
        expect(wrapper).toMatchSnapshot();
    });

    it('render without params', () => {
        const wrapper = shallow(<Order order={{}}/>);
        expect(wrapper).toEqual({});
    });

    it('render with data and items', () => {
        const wrapper = shallow(<Order order={{shop: "test", date: 1, items: ["aa", "ss", "dd"]}}/>);
        expect(wrapper).toMatchSnapshot();
    });

    it('check call getDate', () => {
        shallow(<Order order={fakeOrders[0]}/>);
        expect(getDate).toHaveBeenCalled();
    });
});
