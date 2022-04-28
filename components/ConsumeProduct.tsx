import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'

type ScannedProductProps = {
  type: string
  data: string
}

const ConsumeProduct: FC<ScannedProductProps> = ({data, type}: ScannedProductProps) => {

  return (
    <View>
      <Text>ConsumeProduct</Text>
    </View>
  )
}

export default ConsumeProduct

const styles = StyleSheet.create({})