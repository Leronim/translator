import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Error: React.FC = () => {
    return (
        <View style={style.container}>
            <Text style={style.text}>Something wrong!</Text>
        </View>
    )
}

const style = StyleSheet.create({
    text: {
        color: "#FF0000",
        fontWeight: "400",
        fontSize: 24
    },
    container: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center'
    }
})

export default Error;