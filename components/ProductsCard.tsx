import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Product {
  image: string;
  title: string;
  price: number;
  id: number;
}

const ProductsCard = ({ product }: { product: Product }) => {
  return (
    <TouchableOpacity style={styles.productCard} onPress={() => router.push(`/ProductDetails/${product.id}`)}>
      <View style={styles.productImageContainer}>
        <Image 
          source={{ uri: product.image }}
          style={styles.productImage}
        />
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={20} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.productDetails}>
        <Text>{product.id}</Text>
        <Text style={styles.productName} numberOfLines={1}>{product.title}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductsCard;

const styles = StyleSheet.create({
  gridContainer: {
    padding: 12,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#F4F4F4',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
    marginBottom: 16,
  },
  productImageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#F4F4F4',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    padding: 16,
    backgroundColor: '#F4F4F4',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  productDetails: {
    padding: 16,
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
});
