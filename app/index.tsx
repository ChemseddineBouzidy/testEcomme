import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import CategoryList from "../components/CategoryList";
import ProductsCard from "../components/ProductsCard";
import "../global.css";
export default function Index() {
  const [categories, setCategories] = useState<any[]>([]);
  // const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');




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

  useEffect(() => {
    // fetchProducts(); 
  }, []);

  const { data: productsData, isPending, error, refetch, isFetching } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: async () => {
      const url = selectedCategory
        ? `https://fakestoreapi.com/products/category/${selectedCategory}`
        : 'https://fakestoreapi.com/products';
      const response = await fetch(url);
      const data = await response.json();
      // setProducts(data);
      return data;
    },
    refetchInterval: 5000,

  });
  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message


  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // fetchProducts();
  };



  return (
    <ScrollView>
      <View
        style={{
          flex: 1,

        }}
      >
        <View className="flex-row justify-between items-center px-4 py-2">
          <View className="flex-row items-center flex-1 border-2 border-gray-300 rounded-md px-2">
            <Ionicons name="search" size={20} color="gray" className="mr-2 " />
            <TextInput
              placeholder="Search"
              className="flex-1 py-2 ml-2 text-gray-400"
            />
          </View>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-bold text-left ml-4">Categories</Text>
          <Text className="text-xl font-light text-right mr-4">See All</Text>
        </View>
        <CategoryList categories={categories} onSelectCategory={handleCategorySelect} selected={selectedCategory || ''} />

      </View>
      <View className="flex-row justify-between items-center">
        <Text className="text-xl font-bold text-left ml-4 my-4">Top Selling</Text>
        <TouchableOpacity onPress={() => setSelectedCategory(null)} className="mr-4">
          <Text className="text-xl font-light text-right">See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={productsData}
        renderItem={({ item }) => {
          return (
            <ProductsCard product={item} />
          )
        }}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />


    </ScrollView>
  );
}
const styles = StyleSheet.create({
  gridContainer: {
    padding: 12,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

