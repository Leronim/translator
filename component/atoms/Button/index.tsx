import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, Dimensions } from 'react-native';
import { Neomorph } from 'react-native-neomorph-shadows';

interface Props {
    text: string,
    onPress: () => void
}

const CheckButton: React.FC<Props> = ({ text, onPress }) => {
    const [ swap, setSwap ] = useState<boolean>(false);

    return (
        <Neomorph
            inner={swap}
            darkShadowColor='#000'
            lightShadowColor='#fff'
            style={styles.neomorph}
        >
            <Pressable 
                onPressIn={() => setSwap(true)} 
                onPressOut={() => setSwap(false)}
                style={styles.screenContainer} 
                onPress={() => onPress()}
                testID="sendButton"
            >
                <Text style={styles.text}>{text}</Text>
            </Pressable>
        </Neomorph>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    neomorph: {
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: {
            width: 2,
            height: 4
        },
        borderRadius: 88,
        backgroundColor: '#F2F2F2',
        height: 68,
        width: Dimensions.get('window').width - 40
    },
    text: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 21,
        color: "#000"
    }
})

export default CheckButton;