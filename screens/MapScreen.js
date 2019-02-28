import React from 'react';
import { Image, ScrollView, StyleSheet, View, } from 'react-native';
import { MapView } from 'expo';
import { SearchBar } from 'react-native-elements';
import { Marker } from 'react-native-maps';
import {
  FlatList,
  Text,
} from 'react-native';

// export default class MapScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Map',
//   };

//   state = {
//     search: '',
//   };

//   updateSearch = search => {
//     this.setState({ search });
//   };

//   render() {
//     const { search } = this.state;

//     return (
//       <ScrollView style={styles.container}>
//         <SearchBar platform="ios" placeholder="Search" onChangeText={this.updateSearch} value={search}/>
//         <View style={styles.mapContainer}>
//           <Image source={require('../assets/images/map.png')} style={styles.mapImage}/>
//         </View>
//       </ScrollView>
//     );
//   }
// }

export default class App extends React.Component {
  static navigationOptions = {
    title: 'Map',
  };

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 34.052235,
          longitude: -118.243683,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <MapView.Marker
          coordinate={{longitude: -118.243683, latitude:34.052235 }}
          title={"Los Angeles"}
          description={"description"}
        />
      </MapView>
    );
  }
}


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   mapContainer: {
//   },
//   mapImage: {
//     width: 480,
//     height: 850,
//     resizeMode: 'contain',
//   },
// });

