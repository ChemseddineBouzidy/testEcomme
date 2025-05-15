import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<any[]>([]);

  const productdetails = async () => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    setProduct(data);

  }

  useEffect(() => {
    productdetails();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4">
        <View className="w-full h-72 bg-white rounded-lg shadow-md overflow-hidden">
          <Image
            source={{ uri: product.image }}
            className="w-full h-full object-contain"
            resizeMode="contain"
          />
        </View>

        <View className="mt-6 space-y-4">
          <Text className="text-3xl font-bold text-gray-900">{product.title}</Text>

          <Text className="text-2xl font-semibold text-green-600">
            ${product.price}
          </Text>

          <View className="bg-gray-100 px-4 py-2 rounded-lg">
            <Text className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              {product.category}
            </Text>
          </View>

          <View className="mt-4">
            <Text className="text-gray-700 text-base leading-relaxed">
              {product.description}
            </Text>
         
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ProductDetails

const styles = StyleSheet.create({})