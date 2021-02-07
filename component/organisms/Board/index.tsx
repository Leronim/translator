import React from 'react';
import WordChoise from '../../molecule/WordChoise';
import Pills from '../../atoms/Pills';
import { words } from '../../../constants/word';

const Board: React.FC = () => {
    return(
        <WordChoise>
            {words.map((item, index) => {
                return (
                    <Pills key={index} text={item.text} id={item.id} index={index} />
                )
            })}
        </WordChoise>
    )
}

export default Board;