import { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, TextInput, View } from "react-native";
import CategoryList from "../components/CategoryList";
import ProductsCard from "../components/ProductsCard";
import "../global.css";
export default function Index() {
  // categories
  const [categories, setCategories] = useState<any[]>([])
  const url = "https://fakestoreapi.com/products/categories"
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(url)
      const data = await response.json()
      setCategories(data)
      console.log(data)
    }
    fetchCategories()
  }, [])
  // products
  const [products, setProducts] = useState<any[]>([])
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://fakestoreapi.com/products')
      const data = await response.json()
      setProducts(data)
      console.log(data)
    }
    fetchProducts()
  }, [])
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,

        }}
      >
        <View className="flex-row justify-between items-center px-4 py-2">
          <View className="flex-row items-center flex-1 border-2 border-gray-300 rounded-md px-2">
            <Text className="text-gray-400 mr-2">🔍</Text>
            <TextInput
              placeholder="Search"
              className="flex-1 py-2 "
            />
          </View>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-bold text-left ml-4">Categories</Text>
          <Text className="text-xl font-light text-right mr-4">See All</Text>
        </View>
        <CategoryList categories={categories} />
      </View>
      <View className="flex-row justify-between items-center">
        <Text className="text-xl font-bold text-left ml-4 my-4">Top Selling</Text>
        <Text className="text-xl font-light text-right mr-4">See All</Text>
      </View>
      <FlatList
        data={products}
        renderItem={({ item }) => {
          return (
           <ProductsCard  product={item}/>
          )
        }}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
 
    </ScrollView>
  );
}
