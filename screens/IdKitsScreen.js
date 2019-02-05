import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';

export default class IdKitsScreen extends React.Component {
  static navigationOptions = {
    title: 'Your ID Kits',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.personContainer}><Text style={styles.personText}>Person 1</Text></View>
        <View style={styles.personContainer}><Text style={styles.personText}>Person 2</Text></View>
        <View style={styles.personContainer}><Text style={styles.personText}>Person 3</Text></View>
        <View style={styles.personContainer}><Text style={styles.personText}>Person 4</Text></View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: '#fff',
  },
  personContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 4,
  },
});
