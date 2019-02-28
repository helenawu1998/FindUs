import React from 'react';
import { Image, ScrollView, StyleSheet, View, } from 'react-native';
import { MapView } from 'expo';
import { SearchBar } from 'react-native-elements';
//import { Marker } from 'react-native-maps';

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
          latitude: 118.78825,
          longitude: 34.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
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

