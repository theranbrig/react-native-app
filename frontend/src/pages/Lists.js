import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

const Lists = ({ history }) => (
  <View style={styles.container}>
    <Text style={styles.paragraph}>This is the List Page</Text>
    <Button title="Create Product" onPress={() => history.push('/new-product')} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  field: {
    width: 300,
    fontSize: 20,
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  paragraph: {
    textAlign: 'center',
  },
});

export default Lists;
