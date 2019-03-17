import React from 'react';
import { View, Text, Button, Image, StyleSheet, TextInput } from 'react-native';
import { graphql, Mutation } from 'react-apollo';
import { ImagePicker, Permissions } from 'expo';
import gql from 'graphql-tag';
import TextField from '../components/TextField';

const defaultState = {
  values: {
    name: '',
    price: '',
    pictureUrl: '',
    image: null,
  },
  isSubmitting: false,
  errors: {},
};

class NewProduct extends React.Component {
  state = defaultState;

  pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status) {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      console.log(result);

      if (!result.cancelled) {
        this.handleTextChange('pictureUrl', result.uri);
      }
    }
  };

  handleTextChange = (key, value) => {
    this.setState(state => ({
      values: {
        ...state.values,
        [key]: value,
      },
    }));
  };

  handleSubmit = async () => {
    if (this.state.isSubmitting) {
      return;
    }
    this.setState({ isSubmitting: true });
    let response;
    try {
      response = await this.props.mutate({
        variables: this.state.values,
      });
      console.log('Signed Up');
    } catch (err) {
      // this.setState({
      //   errors: {
      //     email: 'Already Taken',
      //   },
      //   isSubmitting: false,
      // });
    }
    // await AsyncStorage.setItem(TOKEN_KEY, response.data.signup.token);
    // this.setState(defaultState);
    this.props.history.push('/lists');
  };

  goToLogin = () => {
    this.props.history.push('/login');
  };

  render() {
    const { name, price, pictureUrl, image } = this.state.values;
    const { errors, isSubmitting } = this.state;
    return (
      <View style={styles.container}>
        <Text>Create A New Product</Text>
        <View>
          {isSubmitting && <Text>Submitting Info...</Text>}
          <TextField value={name} name="name" onChangeText={this.handleTextChange} />
          {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
          <TextField value={price} name="price" onChangeText={this.handleTextChange} />
          <Button title="Pick an image from camera roll" onPress={this.pickImage} />
          {pictureUrl ? <Image source={{ uri: pictureUrl }} style={{ width: 200, height: 200 }} /> : null}
          <Button title="Add Account" onPress={this.handleSubmit} />
        </View>
      </View>
    );
  }
}

export default NewProduct;

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
