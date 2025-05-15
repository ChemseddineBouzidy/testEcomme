import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CategoryList from "../components/CategoryList";
import ProductsCard from "../components/ProductsCard";
import "../global.css";
export default function Products() {
  const [categories, setCategories] = useState<any[]>([]);
  // const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (!productsData) return;

    const filtered = productsData.filter((product: any) =>
      product.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);

  };


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
      let url;
      if (selectedCategory) {
        url = `https://fakestoreapi.com/products/category/${selectedCategory}`;
      } else {
        url = 'https://fakestoreapi.com/products';
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // setProducts(data);
      return data;
    },
    refetchInterval: 1000 * 60 ,


  });
  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message


  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // fetchProducts();
  };



  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',

          }}
        >


          <View className="flex-row justify-between items-center my-4">
            <TouchableOpacity onPress={() => setSelectedCategory(null)} className="mr-4">
              <Ionicons name="arrow-back" size={20} color="gray" />
            </TouchableOpacity>
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

 
          {isPending && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#8E6CEF" />
            <Text style={styles.loadingText}>Loading products...</Text>
          </View>
        )}





        {!isPending && isFetching && (
          <View style={styles.refreshingIndicator}>
            <ActivityIndicator size="small" color="#8E6CEF" />
            <Text style={styles.refreshingText}>Refreshing data...</Text>
          </View>
        )}

        {productsData.length > 0 ? (
          <FlatList
            data={productsData}
          renderItem={({ item }) => {
            return (
              <ProductsCard product={item} />
            )
          }}
       
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
        ) : (
          <Text className="text-center text-gray-500">No products found</Text>
        )}
  

      </ScrollView>
    </SafeAreaView>
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
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#8E6CEF',
    fontSize: 16,
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    marginTop: 10,
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 15,
    backgroundColor: '#8E6CEF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  refreshingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    backgroundColor: 'rgba(142, 108, 239, 0.1)',
    borderRadius: 4,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  refreshingText: {
    marginLeft: 8,
    color: '#8E6CEF',
    fontSize: 14,
  },
});

