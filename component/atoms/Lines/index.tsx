import React from 'react';
import { View } from 'react-native';

const Lines = () => {
    const array = new Array(3).fill('')
    return (
        <View style={{ height: 70 }}>
            {array.map((_: undefined, index: number) => {
                return (
                    <View 
                        key={index} 
                        style={{ 
                            width: '100%',
                            height: 1,
                            backgroundColor: '#4B4B4B',
                            top: index * 30 - 2,
                         }}
                    />
                )
            })}
        </View>
    )
}

export default Lines