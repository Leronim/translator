import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Lines from '../../atoms/Lines';
import Pills from '../../atoms/Pills';

const words = [
    { id: 1, word: "Er" },
    { id: 8, word: "hungrig" },
    { id: 2, word: "isst" },
    { id: 7, word: "er" },
    { id: 6, word: "weil" },
    { id: 9, word: "ist" },
    { id: 5, word: "," },
    { id: 3, word: "einen" },
    { id: 4, word: "Apfel" },
];

const WordChoise: React.FC = () => {
    const positionChildren = words.map(() => ({
        order: useSharedValue(0),
        width: useSharedValue(0),
        height: useSharedValue(0),
        x: useSharedValue(0),
        y: useSharedValue(0),
        originalX: useSharedValue(0),
        originalY: useSharedValue(0)
    }));

    return(
        <View style={styles.container}>
            <Lines/>
            <View style={styles.containerPills}>
                {words.map((item, index) => {
                    return <Pills
                                key={index}
                                id={item.id} 
                                index={index} 
                                text={item.word}
                                positions={positionChildren}
                            />
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
    },
    containerPills: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    row: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        opacity: 0,
    },
})

export default WordChoise;