import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Lines from '../../atoms/Lines';
import { useSharedValue, runOnUI, runOnJS } from "react-native-reanimated";
import PillsWrapper from '../PillsWrapper';
import { checkOrder } from '../../../utils/animationUtils';

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

interface Props {
    children: React.ReactElement<{ id:number }>[];
}

const containerWidth = Dimensions.get("window").width + 62;

const WordChoise = ({ children }: Props) => {
    const [ready, setReady] = useState(false);
    const positionChildren = children.map(() => ({
        order: useSharedValue(0),
        width: useSharedValue(0),
        height: useSharedValue(0),
        x: useSharedValue(0),
        y: useSharedValue(0),
        originalX: useSharedValue(0),
        originalY: useSharedValue(0)
    }));

    if (!ready) {
        return (
          <View style={styles.row}>
            {children.map((child, index) => {
              return (
                <View
                  key={index}
                  onLayout={({ nativeEvent: { layout: { x, y, width, height } } }) => {
                    const currentPosition = positionChildren[index];
                    currentPosition.order.value =  -1;
                    currentPosition.width.value = width;
                    currentPosition.height.value = height;
                    currentPosition.originalX.value = x;
                    currentPosition.originalY.value = y;
                    runOnUI(() => {
                      "worklet";
                      if (positionChildren.filter(checkOrder).length === 0) {
                        runOnJS(setReady)(true);
                      }
                    })();
                  }}
                >
                  {child}
                </View>
              );
            })}
          </View>
        );
    }

    return(
        <View style={styles.container}>
            <Lines/>
            <View style={{ marginTop: 50 }}>
              {children.map((item, index) => {
                  return (
                      <PillsWrapper
                          key={index}
                          index={index} 
                          positions={positionChildren}
                      >
                          {item}
                      </PillsWrapper>
                  )
              })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerPills: {
        marginTop: 50
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