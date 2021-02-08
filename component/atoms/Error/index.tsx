import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
    message: string;
    color: string;
}

const Error: React.FC<Props> = ({ message, color }) => {
    const style = StyleSheet.create({
        text: {
            color: color,
            fontWeight: "400",
            fontSize: 24
        },
        container: {
            justifyContent: 'center',
            flex: 1,
            alignItems: 'center'
        }
    })


    return (
        <View style={style.container}>
            <Text style={style.text}>{message}</Text>
        </View>
    )
}

export default Error;