import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'native-base';
import { useTranslation } from 'react-i18next';
import { FlatList, View, LogBox } from 'react-native';
// import FlatListProductCategory from 'components/FlatListProductCategory';
// import FlatListProductFlashSale from 'components/FlatListProductFlashSale';
import ItemProductForYou from 'components/ItemProductForYou';
import SSHeaderNavigation from 'components/SSHeaderNavigation';
import SlideShowImage from 'components/SwipeBanner';
import useGetProductsForYou from 'hook/product/useGetProductsForYou';
import { IProduct } from 'interfaces/Product';
import { AppNavigationProp } from 'providers/navigation/types';
import styles from './styles';

export const MainScreen = () => {
  const navigation = useNavigation<AppNavigationProp>();
  LogBox.ignoreAllLogs();
  const { t } = useTranslation();
  const limit = 6;
  const [page, setPage] = useState(1);
  const [product, setProduct] = useState<IProduct[] | null>(null);
  const { products_forYou, isReachingEnd } = useGetProductsForYou(page, limit);

  useEffect(() => {
    if (products_forYou) {
      setProduct((prevProduct) => {
        if (prevProduct) {
          return [...prevProduct, ...products_forYou[0].results];
        }
        return products_forYou[0].results;
      });
    }
  }, [products_forYou]);

  const RenderItemForYou = React.memo(({ data }: { data: IProduct }) => {
    return (
      <ItemProductForYou
        name={data.name}
        image={data.images[0]}
        price={data.price}
        selled={123}
        onPress={() => navigation.navigate('Detail', { _id: data._id })}
      />
    );
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={product}
        contentContainerStyle={{
          paddingBottom: 50,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
        numColumns={2}
        renderItem={({ item }) => <RenderItemForYou data={item} />}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          if (!isReachingEnd) {
            setPage(page + 1);
          }
        }}
        onEndReachedThreshold={0.01}
        ListHeaderComponent={() => {
          return (
            <View>
              <SSHeaderNavigation
                tabHeaderSearchEnabled={true}
                titleHeaderSearchEnabled={true}
                titleHeaderSearch=""
                iconSearchEnabled={true}
                iconOther={false}
                titleHeaderScreen=""
                iconRightHeaderScreen={false}
                iconRightHeaderCart={false}
              />

              <View>
                <SlideShowImage />

                {/* <FlatListProductCategory /> */}
                {/* <FlatListProductFlashSale /> */}
              </View>

              <Text
                style={{
                  textTransform: 'uppercase',
                  fontSize: 16,
                  marginLeft: 12,
                  marginBottom: 8,
                  fontWeight: 'bold',
                }}
              >
                {t('Home.forYou')}
              </Text>
            </View>
          );
        }}
        ListFooterComponent={
          <View style={styles.listFooter} key={1}>
            <ItemProductForYou
              name={''}
              image={''}
              price={0}
              selled={0}
              onPress={() => {}}
              key={2}
            />
            <ItemProductForYou
              name={''}
              image={''}
              price={0}
              selled={0}
              onPress={() => {}}
              key={3}
            />
          </View>
        }
      />
    </View>
  );
};
