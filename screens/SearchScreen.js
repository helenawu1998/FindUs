import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';

class SearchResultPerson extends React.Component {
  render() {
    return (
      <View style={styles.personContainer}>
        <Image source={require('../assets/images/person-icon.png')} style={styles.personImage}/>
        <View style={styles.personInfo}>
          <Text style={styles.personName}>{this.props.name}, {this.props.age}</Text>
          <Text>{this.props.location}</Text>
        </View>
      </View>
    );
  }
}

export default class SearchScreen extends React.Component {
  static navigationOptions = {
    title: 'Search',
  };

  state = {
    searchText: '',
    isSearchResults: false,
    searchResults: [],
  };

  updateSearch = searchText => {
    var isSearchResults = searchText !== '';
    var results = [
      {
        name: 'John Smith',
        age: 36,
        location: 'Los Angeles, CA',
        imgUrl: '../assets/images/person-icon.png',
      },
      {
        name: 'Jane Smith',
        age: 35,
        location: 'San Francisco, CA',
        imgUrl: '../assets/images/person-icon.png',
      },
      {
        name: 'Helena Wu',
        age: 20,
        location: 'Pasadena, CA',
        imgUrl: '../assets/images/person-icon.png',
      },
      {
        name: 'Pamela Zhang',
        age: 20,
        location: 'Pasadena, CA',
        imgUrl: '../assets/images/person-icon.png',
      },
      {
        name: 'Sharon Chen',
        age: 20,
        location: 'Pasadena, CA',
        imgUrl: '../assets/images/person-icon.png',
      },
    ];
    this.setState({
      searchText: searchText,
      isSearchResults: isSearchResults,
      searchResults: results
    });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <SearchBar
          platform="ios"
          placeholder="Search"
          onChangeText={this.updateSearch}
          value={this.state.searchText}
        />
        { 
          this.state.isSearchResults &&
          <View>
            <Text style={styles.searchTitle}>
              Search for '{this.state.searchText}'
            </Text>
            <FlatList
              data={this.state.searchResults}
              keyExtractor={(item, index) => item.name}
              renderItem={
                ({item}) =>
                  <SearchResultPerson
                    name={item.name}
                    age={item.age}
                    location={item.location}
                    imgUrl={item.imgUrl}
                  />
              }
            />
          </View>
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchTitle: {
    margin: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },
  personContainer: {
    backgroundColor: '#eee',
    marginHorizontal: 10,
    marginVertical: 4,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  personInfo: {
    marginLeft: 50,
    marginTop: -36,
  },
  personName: {
    fontWeight: 'bold',
  },
  personImage: {
    width: 40,
    height: 40,
  },
});
