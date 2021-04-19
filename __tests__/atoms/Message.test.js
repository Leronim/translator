import React from 'react';
import Message from '../../component/atoms/Message';
import { render } from '@testing-library/react-native';

test('Message render', () => {
    const tree = render(<Message/>).toJSON();
    expect(tree).toMatchSnapshot();
})

test('Message view', () => {
    const { getByTestId } = render(<Message/>);
    
    expect(getByTestId('view').props.children).toHaveLength(8);
})