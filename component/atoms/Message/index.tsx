import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const message = [
    'Реакт',
    'Нейтив',
    'доставляет',
    'проблем',
    'моей',
    'заднице',
    'зато',
    'весело'
]

const Message = () => {
    return(
        <View style={style.container}>
            {message.map((item: string, index: number) => {
                return(
                    <View key={index} style={style.text}>
                        <Text>{item} </Text>
                    </View>
                )
            })}
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderRadius: 40,
        borderColor: '#252525',
        padding: 17,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 250,
        justifyContent: 'center'
    },
    text: {
        marginRight: 10,
    }
})

export default Message;