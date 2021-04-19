import React from 'react';
import { EventEmitter, Text } from 'react-native';
import Row from '../../component/atoms/Row';
import { render } from '@testing-library/react-native';

test('Row render', () => {
    const tree = render(<Row/>).toJSON();
    expect(tree).toMatchSnapshot();
})

test('Row render children', () => {
    const messageChildren = "Hello";

    const { UNSAFE_getAllByType } = render(
        <Row>
            <Text>{messageChildren}</Text>
        </Row>
    )
    const [ text ] = UNSAFE_getAllByType(Text);

    expect(text.props.children).toEqual(messageChildren);
})