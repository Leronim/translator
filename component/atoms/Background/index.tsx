import React from 'react';
import { View } from 'react-native';
import { Neomorph } from 'react-native-neomorph-shadows';

interface Props {
    position: any
}

const Background = ({ position }: Props) => {
    return (
        <Neomorph
            inner
            swapShadows
            style={{
                backgroundColor: "#E6E5E6",
                position: "absolute",
                top: position.originalY.value + 15,
                left: position.originalX.value - 2,
                width: position.width.value - 6,
                height: 35,
                borderRadius: 13,
                shadowRadius: 4,
          }}
        />
    )
}

export default Background;