import React from 'react'
import { StyleSheet,Text } from 'react-native'

export default function Paragraph() {
  return <Text style={styles.text} >Hello word</Text>
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 12,
  },
})