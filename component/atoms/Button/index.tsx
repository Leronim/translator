import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, Dimensions } from 'react-native';
import { Neomorph } from 'react-native-neomorph-shadows';

interface Props {
    text: string
}

const CheckButton: React.FC<Props> = (props: Props) => {
    const [ swap, setSwap ] = useState<boolean>(false);

    const pressButton = () => () => {
        setSwap(!swap)
    }

    return (
        <Neomorph
            darkShadowColor='#000'
            lightShadowColor='#fff'
            style={styles.neomorph}
        >
            <Pressable style={styles.screenContainer} onPress={pressButton()}>
                <Text style={styles.text}>{props.text} {`${swap}`}</Text>
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
        shadowRadius: 15,
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