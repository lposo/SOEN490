import React from 'react';
import renderer from "react-test-renderer";
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DataCell from '../Components/DataCell/DataCell'

configure({ adapter: new Adapter() });

describe('DataCell Component', () => {

    it("should match snapshot", () => {
        const tree = renderer.create(<DataCell />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render a file input field', () => {
        const wrapper = mount(<DataCell />)
        expect(wrapper.find('input').exists()).toBeTruthy();
    });
});

