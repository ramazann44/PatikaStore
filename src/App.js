import { View, Text, SafeAreaView, FlatList, useColorScheme, TextInput, Image, ListViewBase } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Product_Data from './Product_Data'


const App = () => {

  const isDarkMode = useColorScheme() === 'dark';
  const [wantedProduct, setWantedProduct] = useState('')
  const [wantedProductList, setWantedProductList] = useState()

  function getWantedProduct() {

    if (wantedProduct == "") {
      setWantedProductList(Product_Data);
    } else {

      setWantedProductList({});
      const wantedList = [];
      for (let i = 0; i < Product_Data.length; i++) {

        if (Product_Data[i].title.includes(wantedProduct)) {

          wantedList.push(Product_Data[i])
        }

      }

      setWantedProductList(wantedList)

    }

  }

  function renderItem({ item, index }) {

    return (
      <View style={{
        width: '48%',
        padding: '5%',
        backgroundColor: isDarkMode ? Colors.dark : Colors.light,
        borderRadius: 10,
        margin: '1%',
        padding: '2%',
        justifyContent: 'center',
      }}>

        <Image style={{
          width: '98%',
          height: 200,
          borderRadius: 10,
          marginBottom: 5,
        }}
          source={{
            uri: item.imgURL
          }}
        />

        <Text style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: isDarkMode ? Colors.white : Colors.black
        }}>
          {item.title}
        </Text>

        <Text style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: isDarkMode ? "gray" : "gray"
        }}>
          {item.price}
        </Text>

        {item.inStock == false &&
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: "red"
          }}>
            Stokta Yok
          </Text>
        }

      </View>
    )

  }

  useEffect(() => {

    setWantedProductList({})
    getWantedProduct()

  }, [wantedProduct]);


  return (
    <SafeAreaView style={{
      width: '100%',
      height: '100%',
      backgroundColor: isDarkMode ? Colors.black : Colors.white,
      padding: '2%'
    }}>

      <Text style={{
        fontSize: 24,
        fontWeight: 'bold',
        color: "purple",
        marginLeft:'1%',
        marginBottom:'2%'
      }}>
        PATIKASTORE
      </Text>

      <TextInput
        style={{
          width: '100%',
          padding: 10,
          backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
          borderRadius: 20,
          marginBottom: 10
        }}
        placeholder='Search'
        onChangeText={value => setWantedProduct(value)}
        value={wantedProduct}
        color={isDarkMode ? Colors.white : Colors.black}
      />

      <FlatList
        data={wantedProductList}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />


    </SafeAreaView>
  )
}

export default App