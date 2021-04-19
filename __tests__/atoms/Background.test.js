import React from 'react';
import Background from '../../component/atoms/Background';
import { render } from '@testing-library/react-native';
const currentPosition = {
    order: {
        value: -1
    },
    width: {
        value: 100
    },
    height: {
        value: 100
    },
    originalX: {
        value: 100
    },
    originalY: {
        value: 100
    }
};
test('Background render', () => {
    const tree = render(<Background position={currentPosition}/>).toJSON()
    expect(tree).toMatchSnapshot();
})