import React from 'react'
import { Button,StyleSheet } from 'react-native'

export default function Button() {
  return (
    <Button
      style={[
        styles.button
      ]}
      labelStyle={styles.text}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
})