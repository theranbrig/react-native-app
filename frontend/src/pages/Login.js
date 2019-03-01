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

class Login extends React.Component {
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
      console.log('Logged In');
    } catch (err) {
      this.setState({
        errors: {
          err,
        },
        isSubmitting: false,
      });
    }
    await AsyncStorage.setItem('@grouper/token', response.data.login.token);
    this.setState(defaultState);
    this.props.history.push('/lists');
  };

  goToSignup = () => {
    this.props.history.push('/');
  };

  render() {
    const { name, password, email } = this.state.values;
    const { errors, isSubmitting } = this.state;
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        <View>
          {isSubmitting && <Text>Submitting Info...</Text>}
          {errors.err && <Text style={{ color: 'red' }}>{errors.email}</Text>}
          <TextField value={email} name="email" onChangeText={this.handleTextChange} />
          <TextField value={password} name="password" onChangeText={this.handleTextChange} secureTextEntry />
          <Button title={isSubmitting ? 'Logging In' : 'Log In'} onPress={this.handleSubmit} />
          <Text style={styles.paragraph}>or</Text>
          <Button title="Sign Up" onPress={this.goToSignup} />
        </View>
      </View>
    );
  }
}

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export default graphql(loginMutation)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paragraph: {
    textAlign: 'center',
  },
});
