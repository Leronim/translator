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

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Translate this sentence</Text>
      <Row style={{ marginTop: 50 }}>
        <WordChoise/>
      </Row>
      {/* <Row style={{ marginTop: 80 }}>
        <Button text="Check"/>
      </Row> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'flex-start',
    padding: 20

  },
  title: {
    fontSize: 32,
    fontWeight: 'bold'
  }
});

export default App;
