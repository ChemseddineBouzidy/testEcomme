import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const CategoryList = ({ categories, onSelectCategory, selected }: { categories: any[], onSelectCategory: (category: string) => void, selected: string }) => {
  const categoryImages: { [key: string]: string } = {
    "electronics": require("../assets/images/electronics.png"),
    "jewelery": require("../assets/images/acce.png"),
    "men's clothing": require("../assets/images/short.png"),
    "women's clothing": require("../assets/images/clothes.png"),
  };
  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        data={categories}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => onSelectCategory(item)}>
              <View style={{ alignItems: 'center', gap: 8 }}>
                <Image source={categoryImages[item] || require("../assets/images/clothes.png")} style={styles.itemContainer} />
                <Text style={styles.itemText}>{item}</Text>
              </View>
            </TouchableOpacity>
          )
        }}
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
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
    backgroundColor: '#F4F4F4',
    opacity: 1,
    // borderWidth: 1,
    // borderColor: 'gray',
    width: 70,
    height: 70,
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