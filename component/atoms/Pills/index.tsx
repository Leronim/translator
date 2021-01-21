import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, 
    { useAnimatedGestureHandler, useDerivedValue } from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { useVector } from 'react-native-redash';


interface ListItemProps {
    text: string
    id: number
    index: number
    position: any
}

const Pills: React.FC<ListItemProps> = ({ text, id, index, position }: ListItemProps) => {
    const currentPosition = position[index];
    const inLines = useDerivedValue(() => currentPosition.order.value === -1);
    const transition = useVector();

    const _onPanGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent,{ x: number; y: number }>({
        onStart: (_, event) => {
            if(inLines.value){
                console.log('true')
            } else {
                transition.x.value = currentPosition.x.value;
                transition.y.value = currentPosition.y.value;
            }
            event.x = transition.x.value;
            event.y = transition.y.value;
        },
        onActive: (event) => {

        },
        onEnd: () => {

        }
    });
    
    return(
        <PanGestureHandler onGestureEvent={_onPanGestureEvent}>
            <Animated.View>
                <View style={styles.root}>
                    <View style={styles.shadow}>
                        <Text>{text}</Text>
                    </View>
                </View>
            </Animated.View>
        </PanGestureHandler>
    )
}

const styles = StyleSheet.create({
    root: {
        marginRight: 10,
        marginTop: 20
    },
    shadow: {
        shadowOffset: {
            width: 0, 
            height: 4
        },
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 0.25,
        shadowColor: "#000",
        shadowRadius: 1,
        borderRadius: 13,
        backgroundColor: 'white',
        width: 70,
        height: 30,
        borderWidth: 1,
        borderColor: '#C9C9C9',
    },
})

export default Pills