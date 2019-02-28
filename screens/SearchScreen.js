import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { SearchBar } from 'react-native-elements';

class SearchResultPerson extends TouchableHighlight {
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

class SearchBySelector extends React.Component {
  state = {
    searchBy: 'Name',
  }

  toggleSelector = (searchBy) => {
    this.setState({
      searchBy: searchBy
    })
  };

  selectName = (value) => { this.toggleSelector('Name'); this.props.toggleSelector('Name'); };
  selectAge = (value) => { this.toggleSelector('Age'); this.props.toggleSelector('Age'); };
  selectLocation = (value) => { this.toggleSelector('Location'); this.props.toggleSelector('Location'); };

  render () {
    return (
      <View style={styles.searchBySelector}>
        <Text style={styles.searchByLabel}>Searching by: </Text>
        <Text
          style={[styles.searchByOption,
            this.state.searchBy === 'Name' ? styles.searchByOptionSelected : null]}
          onPress={this.selectName}
          disabled={this.state.searchBy === 'Name'}
        >
          Name
        </Text>
        <Text
          style={[styles.searchByOption,
            this.state.searchBy === 'Age' ? styles.searchByOptionSelected : null]}
          onPress={this.selectAge}
          disabled={this.state.searchBy === 'Age'}
        >
          Age
        </Text>
        <Text
          style={[styles.searchByOption,
            this.state.searchBy === 'Location' ? styles.searchByOptionSelected : null]}
          onPress={this.selectLocation}
          disabled={this.state.searchBy === 'Location'}
        >
          Location
        </Text>
      </View>
    )
  }
}

export default class SearchScreen extends React.Component {
  state = {
    searchText: '',
    isSearchResults: false,
    searchResults: [],
    searchBy: 'Name',
  }

  static navigationOptions = {
    title: 'Search',
  };

  toggleSelector = (searchBy) => {
    this.setState({
      searchBy: searchBy
    })
  };

  updateSearch = searchText => {
    var isSearchResults = searchText !== '';
    var results = [
      {
        casenum: 1,
        name: 'John Smith',
        age: 36,
        location: 'Los Angeles, CA',
        imgUrl: '../assets/images/person-icon.png',
      },
      {
        casenum: 2,
        name: 'Jane Smith',
        age: 35,
        location: 'San Francisco, CA',
        imgUrl: '../assets/images/person-icon.png',
      },
      {
        casenum: 3,
        name: 'Helena Wu',
        age: 20,
        location: 'Pasadena, CA',
        imgUrl: '../assets/images/person-icon.png',
      },
      {
        casenum: 4,
        name: 'Pamela Zhang',
        age: 20,
        location: 'Pasadena, CA',
        imgUrl: '../assets/images/person-icon.png',
      },
      {
        casenum: 5,
        name: 'Sharon Chen',
        age: 20,
        location: 'Pasadena, CA',
        imgUrl: '../assets/images/person-icon.png',
      },
    ];
    this.setState({
      searchText: searchText,
      isSearchResults: isSearchResults,
      searchResults: results,
    });
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ScrollView style={styles.container}>
        <SearchBar
          platform='ios'
          placeholder='Search'
          onChangeText={this.updateSearch}
          value={this.state.searchText}
        />
        <SearchBySelector toggleSelector={this.toggleSelector}/>
        {
          this.state.isSearchResults &&
          <View>
            <Text style={styles.searchTitle}>
              Search for '{this.state.searchText}' by {this.state.searchBy}
            </Text>
            <FlatList
              data={this.state.searchResults}
              keyExtractor={(item, index) => item.name}
              renderItem={
                ({item}) =>
                  <TouchableHighlight onPress={() => navigate('Person', {casenum: item.casenum})}>
                    <SearchResultPerson
                      name={item.name}
                      age={item.age}
                      location={item.location}
                      imgUrl={item.imgUrl}
                    />
                  </TouchableHighlight>
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
  /* 'Search by' selector */
  searchBySelector: {
    margin: 10,
    flexDirection: 'row',
    fontSize: 16,
  },
  searchByLabel: {
    marginVertical: 5,
  },
  searchByOption: {
    marginHorizontal: 2,
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: '#f4f4f4',
  },
  searchByOptionSelected: {
    backgroundColor: '#ddd',
  },
  /* Missing person list */
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
