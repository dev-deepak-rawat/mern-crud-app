import React from 'react';
import { shallow } from 'enzyme';
import UserCard from './UserCard';
describe('UserCard', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<UserCard debug />);

        expect(component).toMatchSnapshot();
    });
});