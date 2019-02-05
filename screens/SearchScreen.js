import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default class SearchScreen extends React.Component {
  static navigationOptions = {
    title: 'Search',
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
        <SearchBar lightTheme placeholder="Search" onChangeText={this.updateSearch} value={search}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
