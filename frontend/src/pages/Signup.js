import React from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { graphql, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

class SignUp extends React.Component {
  state = {
    values: {
      name: '',
      password: '',
      email: '',
    },
    errors: {},
    isSubmitting: false,
  };

  // handleSubmit = async () => {
  //   this.setState({ is });
  //   const response = await this.props.mutate({
  //     variables: this.state.values,
  //   });
  // };

  handleTextChange = (key, value) => {
    this.setState(state => ({
      values: {
        ...state.values,
        [key]: value,
      },
    }));
  };

  render() {
    const { name, password, email } = this.state.values;
    return (
      <Mutation mutation={signUpMutation} varibles={(name, password, email)}>
        {(signup, { loading, error }) => {
          loading && <Text>Loading</Text>;
          error && <Text>{error}</Text>;
          return (
            <View style={styles.container}>
              <Text>Sign Up</Text>
              <View>
                <TextInput
                  onChangeText={text => this.handleTextChange('name', text)}
                  value={name}
                  style={styles.field}
                  placeholder="Name"
                  name="name"
                />
                <TextInput
                  onChangeText={text => this.handleTextChange('email', text)}
                  value={email}
                  style={styles.field}
                  placeholder="Email"
                  name="email"
                />
                <TextInput
                  onChangeText={text => this.handleTextChange('password', text)}
                  value={password}
                  style={styles.field}
                  placeholder="Password"
                  name="password"
                  secureTextEntry
                />
                <Button
                  title="Create Account"
                  onPress={e => {
                    e.preventDefault();
                    signup({ variables: { name, email, password } });
                  }}
                />
              </View>
            </View>
          );
        }}
      </Mutation>
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
    width: 200,
    fontSize: 20,
    borderBottomWidth: 1,
  },
});
