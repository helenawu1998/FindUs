import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class PersonScreen extends React.Component {
  state = {
    casenum: '',
    DLC: '',
    last_name: '',
    first_name: '',
    miss_age: '',
    city: '',
    county: '',
    state: '',
    sex: '',
    race: '',
    date_mod: '',
    imgUrl: '',
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Case #' + navigation.getParam('casenum').toString(),
    };
  };

  componentWillMount() {
    this.state.casenum = this.props.navigation.state.params.casenum;
    // TODO: fetch case data from database!
    this.state.DLC = 'DLC';
    this.state.last_name = 'Wu';
    this.state.first_name = 'Helena';
    this.state.miss_age = '20';
    this.state.city = 'Pasadena';
    this.state.county = 'Los Angeles';
    this.state.state = 'CA';
    this.state.sex = 'F';
    this.state.race = 'Chinese';
    this.state.date_mod = 'Feb 28, 2019';
    this.state.imgUrl = '../assets/images/person-icon.png';
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{this.state.first_name} {this.state.last_name}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
