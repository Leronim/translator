import React from 'react';
import Error from '../../component/atoms/Error';
import { render } from '@testing-library/react-native';

test('Erorr render', () => {
    const tree = render(<Error message="Something wrong!" color="#FF0000"/>).toJSON();
    expect(tree).toMatchSnapshot();
})

test('Error props', () => {
    const message = "Something wrong!";
    const color = "#FF0000";

    const { getByTestId } = render(<Error message={message} color={color}/>);

    expect(getByTestId('errorMessage').children[0]).toEqual(message);
    expect(getByTestId('errorMessage').props.style.color).toEqual(color)
})