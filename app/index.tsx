import { router } from 'expo-router'
import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const index = () => {
  // useEffect(() => {
  //   setTimeout(() => {
  //     router.replace('/Products')
  //   }, 3000)
  // }, [])
  
  return (
    <SafeAreaView className='flex-1 justify-center items-center bg-[#8E6CEF]'>
    <View className='flex-1 justify-center items-center'>
      <Image source={require('../assets/images/logo.png')} className=' resize-contain' />
    </View> 
    <View className='w-full px-5'>
      <TouchableOpacity onPress={() => router.replace('/Products')} className='bg-black rounded-xl p-5 w-full' >
        <Text className='text-white text-center font-bold text-lg'>Go to Products</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({})