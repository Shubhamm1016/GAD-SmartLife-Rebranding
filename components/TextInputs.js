import React from 'react'
import { View, StyleSheet, TextInput,Text } from 'react-native'

export default function TextInput() {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        underlineColor="transparent"
        mode="outlined"
      />
      {description && !errorText ? (
        <Text style={styles.description}>description</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>error</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: "blue",
  },
  description: {
    fontSize: 13,
    color: "black",
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: "black",
    paddingTop: 8,
  },
})