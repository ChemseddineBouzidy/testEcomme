import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
const CategoryList = ({ categories }: { categories: any[] }) => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        data={categories}
        renderItem={({ item}) => {
          return (
            <View style={{alignItems: 'center', gap: 8}}>
              <View style={styles.itemContainer} />
              <Text style={styles.itemText}>{item}</Text>
            </View>
          )
        }}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  )
}

export default CategoryList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  listContainer: {
    gap: 32,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemContainer: {
    backgroundColor: 'gray',
    opacity: 0.5,
    borderWidth: 1,
    borderColor: '#4E71FF',
    width: 80,
    height: 80,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  itemText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 8
  }
})