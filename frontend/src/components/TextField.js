import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

class TextField extends React.Component {
  handleText = text => {
    const { onChangeText, name } = this.props;
    onChangeText(name, text);
  };

  render() {
    const { value, name, secureTextEntry } = this.props;
    return (
      <TextInput
        onChangeText={this.handleText}
        value={value}
        style={styles.field}
        placeholder={name}
        autoCapitalize="none"
        secureTextEntry={!!secureTextEntry}
      />
    );
  }
}

const styles = StyleSheet.create({
  field: {
    width: 300,
    fontSize: 20,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});

export default TextField;
