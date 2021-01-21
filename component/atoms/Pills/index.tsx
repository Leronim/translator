import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import Animated, 
    { useAnimatedGestureHandler, useDerivedValue,
    useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { useVector, between, move } from 'react-native-redash';

interface Position {
    height: { value: number },
    order: { value: number },
    originalX: { value: number },
    originalY: { value: number },
    width: { value: number },
    x: { value: number },
    y: { value: number }
}

interface ListItemProps {
    text: string
    id: number
    index: number
    positions: Position[]
}

const containerWidth = Dimensions.get("window").width - 10 * 2;

const Pills: React.FC<ListItemProps> = ({ text, id, index, positions }: ListItemProps) => {
    const currentPosition: Position = positions[index];
    //TODO: Узнать почему с useState вылетает ошибка
    const inLines = useDerivedValue(() => currentPosition.order.value === -1);
    const transition = useVector();
    const isTouch = useSharedValue(false);

    const translateX = useDerivedValue(() => {
        if(isTouch.value) {
            return transition.x.value
        }
        return withSpring(currentPosition.originalX.value);
    })

    const translateY = useDerivedValue(() => {
        if (isTouch.value) {
            return transition.y.value;
        }
        return withSpring(currentPosition.originalY.value);
    })

    const onPanGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent,{ x: number; y: number }>({
        onStart: (_, event) => {
            if(inLines.value){
                transition.x.value = currentPosition.originalX.value;
                transition.y.value = currentPosition.originalY.value;
            } else {
                transition.x.value = currentPosition.x.value;
                transition.y.value = currentPosition.y.value;
            }
            event.x = transition.x.value;
            event.y = transition.y.value;
            isTouch.value = true;
        },
        onActive: (translation, event) => {
            transition.x.value = event.x + translation.translationX;
            transition.y.value = event.y + translation.translationY;
        },
        onEnd: () => {
            isTouch.value = false;
        }
    });

    const animStyle = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0,
            width: currentPosition.width.value,
            height: 55,
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value }
            ],
        }
    })
    return(
        <View>
            <Animated.View style={animStyle}>
                <PanGestureHandler onGestureEvent={onPanGestureEvent}>
                    <Animated.View>
                        <View style={styles.root}>
                            <View style={styles.shadow}>
                                <Text>{text}</Text>
                            </View>
                        </View>
                    </Animated.View>
                </PanGestureHandler>
            </Animated.View>
        </View>
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