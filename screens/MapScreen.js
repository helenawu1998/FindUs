import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Map',
  };

  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <ScrollView style={styles.container}>
        <SearchBar platform="ios" placeholder="Search" onChangeText={this.updateSearch} value={search}/>
        <View style={styles.mapContainer}>
          <Image source={require('../assets/images/map.png')} style={styles.mapImage}/>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
  },
  mapImage: {
    width: 480,
    height: 850,
    resizeMode: 'contain',
  },
});

