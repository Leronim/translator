/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Button from "./component/atoms/Button";
import WordChoise from './component/molecule/WordChoise';
import Row from './component/atoms/Row';
import Lines from './component/atoms/Lines';
import Pills from './component/atoms/Pills';
import Logo from './component/atoms/Logo';
import Svg from './component/atoms/Svg';
import Message from './component/atoms/Message';

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

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Translate this sentence</Text>
      <View style={{ flex: 1, height: 300, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
        <Svg/>
        <Message/>
      </View>
      <WordChoise>
        {words.map((item, index) => {
          return (
            <Pills key={index} text={item.word} id={item.id} index={index}/>
          )
        })}
      </WordChoise>
      <Row style={{ marginTop: 80 }}>
        <Button text="Check"/>
      </Row>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold'
  }
});

export default App;
