import React from 'react';
import { Image, ScrollView, StyleSheet, View, Dimensions, } from 'react-native';
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
const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

var results = [
      {
        casenum: 1,
        name: 'John Smith',
        age: 36,
        location: 'Los Angeles, CA',
        latitude: 34.058005, 
        longitude: -118.302853,
        imgUrl: '../assets/images/person-icon.png',
      },
      {
        casenum: 2,
        name: 'Jane Smith',
        age: 35,
        location: 'San Francisco, CA',
        latitude: 37.752505, 
        longitude: -122.447558,
        imgUrl: '../assets/images/person-icon.png',
      },
      {
        casenum: 3,
        name: 'Helena Wu',
        age: 20,
        location: 'Pasadena, CA',
        latitude: 34.136838, 
        longitude: -118.126160,
        imgUrl: '../assets/images/person-icon.png',
      },
      {
        casenum: 4,
        name: 'Pamela Zhang',
        age: 20,
        location: 'Pasadena, CA',
        latitude: 34.146373, 
        longitude: -118.134615,
        imgUrl: '../assets/images/person-icon.png',
      },
      {
        casenum: 5,
        name: 'Sharon Chen',
        age: 20,
        location: 'Pasadena, CA',
        latitude: 34.134584, 
        longitude: -118.147108,
        imgUrl: '../assets/images/person-icon.png',
      },
    ];

function getCasesInLocation(persons, city){
  const result = persons.filter(place => place.location === city);
  return result;
}

let markers = results.map(person => (
  <MapView.Marker
    key = {person.casenum}
    coordinate={{
      longitude: person.longitude, 
      latitude: person.latitude,
    }}
    title={person.location}
    description={person.name}
  />
  ));

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
          latitudeDelta: 0.1922,
          longitudeDelta: 0.1421,
        }}
      >
        {markers}
      </MapView>
    );
  }
}


const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#fff',
   },
   card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
//   mapContainer: {
//   },
//   mapImage: {
//     width: 480,
//     height: 850,
//     resizeMode: 'contain',
//   },
});

