import React from 'react';
import Lines from '../../component/atoms/Lines';
import { render } from '@testing-library/react-native';

test('Lines render', () => {
    const tree = render(<Lines/>).toJSON();
    expect(tree).toMatchSnapshot();
})