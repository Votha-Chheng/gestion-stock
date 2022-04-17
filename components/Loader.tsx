import { Animated, Easing, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { IconButton } from 'react-native-paper'
import globalStyles from '../globalStyles'
import Icon from 'react-native-vector-icons/FontAwesome5'

type LoaderProps = {
  color: string
}

const Loader:FC<LoaderProps> = ({color}: LoaderProps) => {

  let rotationLoader = new Animated.Value(0)

  const startRotate = ()=>{
    rotationLoader.setValue(0)
    Animated.timing(rotationLoader, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: false
    }).start(()=>startRotate())
  } 

  useEffect(()=>{
    startRotate()
  }, [])


  const rotate = rotationLoader.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  return (
    <View style={globalStyles.loader}>
      <Animated.View style={{transform :[{rotate}]}} >
        <Icon name="spinner" color={color} size={50}/>
      </Animated.View>
      <Text style={{color}}>Chargement...</Text>
    </View>
  )
}

export default Loader