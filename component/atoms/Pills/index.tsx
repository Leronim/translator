import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface ListItemProps {
    text: string
    id: number
    index: number
}


const Pills: React.FC<ListItemProps> = ({ text, id, index}: ListItemProps) => {
    return(
        <View style={styles.root}>
            <View style={styles.shadow}>
                <Text>{text}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        marginRight: 10,
        marginTop: 15,
        width: 70,
        height: 30,
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