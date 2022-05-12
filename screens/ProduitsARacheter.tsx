import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { Product } from '../models/Product'

type ProduitsARacheterProps = {
  realm: Realm
  allProducts: Product[]
}
const ProduitsARacheter: FC<ProduitsARacheterProps> = ({realm, allProducts}: ProduitsARacheterProps) => {
  return (
    <View>
      <Text>ProduitsARacheter</Text>
    </View>
  )
}

export default ProduitsARacheter

const styles = StyleSheet.create({})