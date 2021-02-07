/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Home from './Page/Home';


const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Home/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  }
});

export default App;
