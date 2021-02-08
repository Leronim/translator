import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import Task from '../../organisms/Task';
import Board from '../../organisms/Board';
import Row from '../../atoms/Row';
import Button from '../../atoms/Button';
import Error from '../../atoms/Error';
import { setInitialWord, checkBoard } from '../../../store/words';

const Translate: React.FC = () => {
    const [isError, setIsError] = useState<boolean>(true);
    const [isRight, setIsRight] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('Something wrong!');

    useEffect(() => {
        setInitialWord()
    }, [])

    const handleButtonCheckPress = async () => {
        const result: boolean = await checkBoard();
        setIsError(result);
        setIsRight(result);
        result ? setMessage('Right!') : setMessage('Something wrong!')
    }

    return (
        <React.Fragment>
            <Text style={styles.title}>Translate this sentence</Text>
            <Task/>
            <Board/>
            <Row style={{ marginTop: 50, justifyContent: 'flex-end' }}>
                {!isError && <Error message={'Something wrong!'} color="#FF0000"/>}
                {isRight && <Error message={'Right!'} color="#00ff00"/> }
                <Button text="Check" onPress={handleButtonCheckPress}/>
            </Row>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    title: {
      fontSize: 32,
      textAlign: 'center',
      fontWeight: 'bold',
      justifyContent: 'center',
      alignItems: 'center'
    }
  });

export default Translate;