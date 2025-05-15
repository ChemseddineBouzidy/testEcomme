    import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
    
    const ProductsCard = ({product}: {product: any}) => {
      return (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={{uri: product.image}} style={styles.image} />
          </View>
          <View style={styles.details}>
            <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
            <Text style={styles.price}>${product.price}</Text>
            <Text style={styles.description} numberOfLines={1}>
              {product.description}
            </Text>
          </View>
        </View>
      )
    }
    
    export default ProductsCard
    
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 16,
            marginBottom: 16,
        },
        imageContainer: {
            width: 100,
            height: 100,
            borderRadius: 10,
            backgroundColor: '#f0f0f0',
        },
        image: {
            width: '100%',
            height: '100%',
            borderRadius: 10,
        },
        details: {
            flex: 1,
            marginLeft: 16,
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 8,
        },
        price: {
            fontSize: 16,
            color: '#666',
            marginBottom: 4,
        },
        description: {
            fontSize: 14,
            color: '#666',
        },  
    })