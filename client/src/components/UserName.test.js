import React from 'react';
import { shallow } from 'enzyme';
import UserName from './UserName';

describe('UserName', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<UserName debug />);

        expect(component).toMatchSnapshot();
    });
});