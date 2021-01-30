import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Animated, 
    { useAnimatedGestureHandler, useDerivedValue,
    useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { useVector } from 'react-native-redash';
import Background from '../../atoms/Background';
import { calculatingInLinePos, checkOrder, removePills,
        sortPills, calculatingWithoutLinePos } from '../../../utils/animationUtils';


interface ListItemProps {
    index: number
    positions: Position[]
    children: React.ReactElement<{ id: number}>;
}

const containerWidth = Dimensions.get("window").width + 10;

const PillsWrapper: React.FC<ListItemProps> = ({ index, positions, children }: ListItemProps) => {
    const currentPosition: Position = positions[index];
    //TODO: Узнать почему с useState вылетает ошибка
    const inLines = useDerivedValue(() => currentPosition.order.value === -1);
    const notLineLength = useDerivedValue(() => positions.filter(item => item.order.value === -1).length);
    const transition = useVector();
    const isTouch = useSharedValue(false);
    
    const translateX = useDerivedValue(() => {
        if (isTouch.value) {
          return transition.x.value;
        }
        // let pos;
        // if(inLines.value && notLineLength.value === 9) {
        //     pos = currentPosition.originalX.value;
        // } else {
        //     pos = currentPosition.x.value;
        // }
        // return withSpring(pos);
        return withSpring(
          inLines.value ? currentPosition.originalX.value : currentPosition.x.value
        );
    });

    const translateY = useDerivedValue(() => {
        if (isTouch.value) {
          return transition.y.value;
        }
        // let pos;
        // if(inLines.value && notLineLength.value === 9) {
        //     pos = currentPosition.originalY.value;
        // } else {
        //     pos = currentPosition.y.value;
        // }
        // return withSpring(pos);
        return withSpring(
          inLines.value ? currentPosition.originalY.value : currentPosition.y.value
        );
    });

    const onPanGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent,{ x: number; y: number }>({
        onStart: (_, ctx) => {
            if (inLines.value) {
                transition.x.value = currentPosition.originalX.value;
                transition.y.value = currentPosition.originalY.value;
              } else {
                transition.x.value = currentPosition.x.value;
                transition.y.value = currentPosition.y.value;
              }
              ctx.x = transition.x.value;
              ctx.y = transition.y.value;
              isTouch.value = true;
        },
        onActive: ({ translationX, translationY }, ctx) => {
            transition.x.value = ctx.x + translationX;
            transition.y.value = ctx.y + translationY;
            if (inLines.value && transition.y.value < -40) {
                //Если pills зашел на линию, ищем какое положение он 
                //должен занять на ней
                currentPosition.order.value = positions.filter(checkOrder).length;
                // Расчет положения pills на линии
                calculatingInLinePos(positions, containerWidth);
                // calculatingWithoutLinePos(positions, containerWidth, index)
            } else if(!inLines.value && transition.y.value > -15) {
                currentPosition.order.value = -1;
                removePills(positions, index);
                calculatingInLinePos(positions, containerWidth);
            }
            sortPills(positions, transition, index, containerWidth, currentPosition)
        },
        onEnd: () => {
            isTouch.value = false;
            // calculatingInLinePos(positions, containerWidth);
            transition.x.value = withSpring(currentPosition.x.value);
            transition.y.value = withSpring(currentPosition.y.value);
        }
    });

    const animStyle = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: isTouch.value ? 100 : 0,
            width: currentPosition.width.value,
            height: 55,
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value }
            ],
        }
    })
    return(
        <>
            <Background position={currentPosition}/>
            <Animated.View style={animStyle}>
                <PanGestureHandler onGestureEvent={onPanGestureEvent}>
                    <Animated.View style={StyleSheet.absoluteFill}>
                        {children}
                    </Animated.View>
                </PanGestureHandler>
            </Animated.View>
        </>
    )
}

export default PillsWrapper