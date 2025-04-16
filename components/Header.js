import React from 'react'
import { StyleSheet ,Text} from 'react-native'

export default function Header() {
  return <Text style={styles.header} >Hello</Text>
}

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
})