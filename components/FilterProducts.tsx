import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Chip } from 'react-native-paper'

const FilterProducts = () => {
  const [filterSelected, setFilterSelected] = useState<string>("")

  return (
    <View style={styles.filterContainer}>
      <Text style={{textAlign:"center", fontFamily:"Inter_600SemiBold", backgroundColor:"white", fontSize:15}}>Filtrer par</Text>
      <View style={styles.filters}>
        <Chip style={styles.chipStyle} selected={filterSelected === ""} icon="cancel" onPress={() => setFilterSelected("")}>Aucun</Chip>
        <Chip style={styles.chipStyle} selected={filterSelected === "marque"} icon="watermark" onPress={() => setFilterSelected("marque")}>Marque</Chip>
        <Chip style={styles.chipStyle} selected={filterSelected === "catégorie"} icon="shape" onPress={() => setFilterSelected("catégorie")}>Catégorie</Chip>
        <Chip style={styles.chipStyle} selected={filterSelected === "nom"} icon="form-textbox" onPress={() => setFilterSelected("nom")}>Nom</Chip>
      </View>
    </View>
  )
}

export default FilterProducts

const styles = StyleSheet.create({
  filterContainer: {
    height: 80,
    paddingVertical:5
  },
  filters: {
    flexDirection: 'row',
    justifyContent: "center"
  },
  chipStyle: {
    marginRight:3
  }
})