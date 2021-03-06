import React from 'react';
import { AsyncStorage, View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { graphql, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { NativeRouter, Route, Link, Switch } from 'react-router-native';
import TextField from '../components/TextField';
import { TOKEN_KEY } from '../constants';

const defaultState = {
  values: {
    name: '',
    password: '',
    email: '',
  },
  isSubmitting: false,
  errors: null,
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
    const response = await this.props.mutate({
      variables: this.state.values,
    });
    const { payload, error } = response.data.login;

    if (payload) {
      await AsyncStorage.setItem(TOKEN_KEY, payload.token);
      console.log(payload.token);
      this.setState(defaultState);
      this.props.history.push('/lists');
    } else {
      this.setState({
        errors: error.msg,
      });
      console.log(this.state.errors);
    }
    this.setState({ isSubmitting: false });
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
          {errors && <Text style={{ color: 'red' }}>{errors}</Text>}
          <TextField value={email} name="email" onChangeText={this.handleTextChange} />
          <TextField value={password} name="password" onChangeText={this.handleTextChange} secureTextEntry />
          {}
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
      payload {
        token
      }
      error {
        field
        msg
      }
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
