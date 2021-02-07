import React from 'react';
import { View } from 'react-native';
import Person from '../../../assets/svg/boy.svg';
import Message from '../../atoms/Message';

const Task: React.FC = () => {
    return(
        <View style={{ flex: 1, height: 300, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
            <Person width="150px" height="150px" fill="#000"/>
            <Message />
        </View>
    )
}

export default Task;