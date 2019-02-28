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
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Case #' + navigation.getParam('casenum').toString(),
    };
  };

  componentWillMount() {
    this.state.casenum = this.props.navigation.state.params.casenum;
    // TODO: fetch case data from database!
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Case #{this.state.casenum}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
  },
  title: {
    margin: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
