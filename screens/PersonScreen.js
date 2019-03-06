import React from 'react';
import {
  Button,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class PersonScreen extends React.Component {
  state = {
    casenum: '',
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'NamUs Case #' + navigation.getParam('casenum').toString(),
    };
  };

  componentWillMount() {
    this.state.casenum = this.props.navigation.state.params.casenum;
  }

  componentDidMount() {
    return fetch('http://127.0.0.1:5000/case-number?casenum=' + this.state.casenum)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(responseJson[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{justifyContent: 'center', alignItems: 'center',}}>
          <Image source={require('../assets/images/person-icon.png')} style={styles.img}/>
          <Text style={styles.name}>{this.state["First Name"]} {this.state["Last Name"]}</Text>
          <Text>
            <Text style={styles.label}>Missing from: </Text>
            {this.state["City"]}, {this.state["County"]}, {this.state["State"]}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Case Information</Text>
          <Text><Text style={styles.label}>Date of last contact:</Text> {this.state["DLC"]}</Text>
          <Text><Text style={styles.label}>Date last modified:</Text> {this.state["Date Modified"]}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Demographics</Text>
          <Text><Text style={styles.label}>Missing age:</Text> {this.state["Missing Age"]}</Text>
          <Text><Text style={styles.label}>Sex:</Text> {this.state["Sex"]}</Text>
          <Text><Text style={styles.label}>Race:</Text> {this.state["Race / Ethnicity"]}</Text>
        </View>
        <View style={styles.namusButton}>
          <Button
            title='Open case on NamUs'
            onPress={() => Linking.openURL('https://www.namus.gov/MissingPersons/Case#/'
              + this.state.casenum.toString().replace('MP', ''))}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4e4e4',
    padding: 20,
  },
  img: {
    width: 200,
    height: 200,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 20,
  },
  sectionTitle: {
    marginBottom: 10,
    color: '#15499b',
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
  },
  namusButton: {
    marginTop: 20,
  }
});
