import React from 'react';
import { AsyncStorage, View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { graphql, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { NativeRouter, Route, Link, Switch } from 'react-router-native';
import TextField from '../components/TextField';

const defaultState = {
  values: {
    name: '',
    password: '',
    email: '',
  },
  isSubmitting: false,
  errors: {},
};

class SignUp extends React.Component {
  state = defaultState;

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
      this.setState({
        errors: {
          email: 'Already Taken',
        },
        isSubmitting: false,
      });
    }
    await AsyncStorage.setItem('@grouper/token', response.data.signup.token);
    this.setState(defaultState);
    this.props.history.push('/lists');
  };

  goToLogin = () => {
    this.props.history.push('/login');
  };

  render() {
    const { name, password, email } = this.state.values;
    const { errors, isSubmitting } = this.state;
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        <View>
          {isSubmitting && <Text>Submitting Info...</Text>}
          <TextField value={name} name="name" onChangeText={this.handleTextChange} />
          {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
          <TextField value={email} name="email" onChangeText={this.handleTextChange} />
          <TextField value={password} name="password" onChangeText={this.handleTextChange} secureTextEntry />
          <Button title="Create Account" onPress={this.handleSubmit} />
          <Text style={styles.paragraph}>or</Text>
          <Button title="Login" onPress={this.goToLogin} />
        </View>
      </View>
    );
  }
}

const signUpMutation = gql`
  mutation($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

export default graphql(signUpMutation)(SignUp);

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
