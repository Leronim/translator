import React from 'react';
import { Text } from 'react-native';
import Pills from '../../component/atoms/Pills';
import { render } from '@testing-library/react-native';
test('Pills render', () => {
    const tree = render(<Pills/>).toJSON();
    expect(tree).toMatchSnapshot();
})

test('Pills message', () => {
    const message = "React";

    const { UNSAFE_getAllByType } = render(<Pills text={message}/>);

    const [ text ] = UNSAFE_getAllByType(Text)

    expect(text.props.children).toEqual(message);
})