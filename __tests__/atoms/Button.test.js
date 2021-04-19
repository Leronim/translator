import React from 'react';
import Button from '../../component/atoms/Button';
import { render, fireEvent } from '@testing-library/react-native';

test('Button render', () => {
    const tree = render(<Button text="Check"/>).toJSON();
    expect(tree).toMatchSnapshot();
})

test('click button', () => {
    const handleClick = jest.fn();

    const { getByTestId } = render(<Button text="Check" onPress={handleClick}/>);
    fireEvent.press(getByTestId("sendButton"));

    expect(handleClick).toHaveBeenCalled();    
})