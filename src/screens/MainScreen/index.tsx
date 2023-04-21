import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Toast } from 'native-base';
import { BackHandler, TextInput, FlatList, View } from 'react-native';
import FlatListProductCategory from 'components/FlatListProductCategory';
import FlatListProductFlashSale from 'components/FlatListProductFlashSale';
import FlatListProductForYou from 'components/FlatListProductForYou';
import IconCart from 'components/IconCart';
import SlideShowImage from 'components/SwipeBanner';
import useGetCarts from 'hook/product/useGetCarts';
import useGetProducts from 'hook/product/useGetProducts';
import { authAPI } from 'modules';
import { AppNavigationProp } from 'providers/navigation/types';
import styles from './styles';

export const MainScreen = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const [scrollEnable, setScrollEnable] = useState(false);
  let yOffset = '';

  const limit = 6;
  const [page, setPage] = useState(1);
  const [product, setProduct] = useState(() => []);
  const { products, isReachingEnd, error_products } = useGetProducts(page, limit);
  const { carts } = useGetCarts();

  useEffect(() => {
    if (products) {
      setProduct(product.concat(products[0].data.results));
    }
  }, [products]);

  const onScroll = () => {
    if (parseFloat(yOffset) > 50) {
      setScrollEnable(true);
    } else if (parseFloat(yOffset) === 0) {
      setScrollEnable(false);
    }
  };

  const [lastBackPressed, setLastBackPressed] = useState(0);

  const logOut = async () => {
    try {
      const response = await authAPI.logout();
      Toast.show({
        title: response.data.message,
        duration: 3000,
      });
      navigation.navigate('Login');
    } catch (e: any) {
      Toast.show({
        title: e.response?.data?.message,
        duration: 3000,
      });
    }
  };

  const handleBackPress = () => {
    const currentTime = new Date().getTime();

    if (currentTime - lastBackPressed < 2000) {
      logOut();
      return true;
    }

    Toast.show({ title: 'Press back again to exit', duration: 2000 });
    setLastBackPressed(currentTime);
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => backHandler.remove();
  }, [handleBackPress]);

  return (
    <View style={styles.container}>
      <FlatList
        data={null}
        renderItem={null}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        onScroll={(event) => {
          yOffset = event.nativeEvent.contentOffset.y.toString();
          onScroll();
        }}
        onEndReachedThreshold={0.01}
        ListHeaderComponent={() => {
          return (
            <View>
              <View>
                <SlideShowImage />

                <FlatListProductCategory data={product} />
                <FlatListProductFlashSale data={product} error={error_products} />
              </View>
              <FlatListProductForYou
                data={product}
                onEndReached={() => {
                  if (!isReachingEnd) {
                    setPage(page + 1);
                    // eslint-disable-next-line no-console
                    console.log('page', page);
                  }
                }}
              />
            </View>
          );
        }}
      />
      <View style={scrollEnable ? styles.coverHeaderOnScroll : styles.coverHeader}>
        {scrollEnable ? <TextInput style={styles.search} placeholder="Search" /> : <View></View>}
        <IconCart
          onPressCart={() => navigation.navigate('Cart')}
          onPressSearch={() => navigation.navigate('SearchProduct')}
          quantityItems={carts?.data.length}
        />
      </View>
    </View>
  );
};
