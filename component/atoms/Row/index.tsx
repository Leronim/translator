import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface Props {
    children: React.ReactNode,
    style?: {
        marginTop?: number | undefined,
        height?: number | string | undefined,
        justifyContent?: "flex-end" | "flex-start" | "center" | "space-between" | "space-around" | "space-evenly" | undefined
    }
}

const Row: React.FC<Props> = (props: Props) => {
    const combineStyles = StyleSheet.flatten([props.style, styles.row])
    
    return (
        <View style={combineStyles}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        width: "100%",
        paddingRight: 20, 
        paddingLeft: 20,
        flex: 1,
    }
})

export default Row;