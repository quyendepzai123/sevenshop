import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList } from 'react-native';
import ButtonCategory from 'components/ButtonCategory';
import ItemProductCategory from 'components/ItemProductCategory';
import useGetCategories from 'hook/product/useGetCategories';
import { IProduct } from 'interfaces/Product';
import { AppNavigationProp } from 'providers/navigation/types';
import styles from './styles';

type Props = {
  data: IProduct[];
};
const FlatListProductCategory = (props: Props) => {
  const navigation = useNavigation<AppNavigationProp>();
  const { data } = props;
  const { categories } = useGetCategories();
  const [ItemSelected, setItemSelected]: any = useState([]);
  const [progressEnable, setProgressEnable] = useState(true);
  const [firstItemSelected, setFirstItemSelected] = useState(false);
  const [idItemSelected, setIdItemSelected] = useState('');

  useEffect(() => {
    if (categories) {
      const newCategories = categories?.data.results.map((category: any) => ({
        ...category,
        isSelected: false,
      }));
      setItemSelected(newCategories);
    }
    setProgressEnable(true);
  }, [categories]);

  const RenderItemCategory = ({ data }: { data: IProduct }) => {
    return (
      <ItemProductCategory
        onPress={() => navigation.navigate('Detail', { _id: data._id })}
        name={data.name}
        image={data.images[0]}
        price={data.price}
      />
    );
  };

  return (
    <View>
      <View style={styles.coverCategories}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={ItemSelected}
          renderItem={({ item, index }: any) => {
            if (!firstItemSelected && index === 0) {
              item.isSelected = true;
              setFirstItemSelected(true);
              setIdItemSelected(item._id);
            }

            return (
              <ButtonCategory
                onPress={() => {
                  const ItemSelected3 = ItemSelected.map((item2: any) => {
                    return { ...item2, isSelected: item.name === item2.name };
                  });
                  setItemSelected(ItemSelected3);
                  setIdItemSelected(item._id);
                }}
                title={item.name}
                isSelected={item.isSelected}
                key={item._id}
              />
            );
          }}
        />
      </View>
      {!progressEnable ? (
        <View></View>
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.flashListFlashSale}
          data={
            data
              ? data.filter(function (item) {
                  // console.warn(id_Category());
                  return item.category_ids.includes(idItemSelected);
                })
              : null
          }
          renderItem={({ item }) => <RenderItemCategory data={item} />}
          keyExtractor={(item1, index) => index.toString()}
        />
        // <View style={{ flexDirection: 'row' }}>
        //   <ScrollView>
        //     <FlatList
        //       showsHorizontalScrollIndicator={false}
        //       horizontal
        //       contentContainerStyle={styles.flashListFlashSale}
        //       data={
        //         data
        //           .filter(function (item) {
        //             return item.categories_type === id_Category();
        //           })
        //           .slice(0, end)
        //         // .concat(data1)
        //       }
        //       renderItem={({ item }) => <RenderItemCategory data={item} />}
        //       keyExtractor={(item) => item.id}
        //       onEndReached={() => {
        //         // setdata1(data1.concat(data1));
        //         setEnd(end + 1);
        //         // setTimeLoad();
        //       }}
        //       onEndReachedThreshold={0.1}
        //       ListFooterComponent={
        //         // !isLoaddingItemCategory ? (
        //         //   <View style={{ marginBottom: 100, marginHorizontal: 20 }}>
        //         //     <ActivityIndicator size={30} />
        //         //   </View>
        //         // ) : (
        //         //   <View style={{ marginRight: -100 }}></View>
        //         // )
        //         <Pressable
        //           style={{
        //             width: 150,
        //             height: '75%',
        //             justifyContent: 'center',
        //             alignItems: 'center',
        //             marginBottom: 100,
        //             borderWidth: 0.2,
        //             borderRadius: 2,
        //             flexDirection: 'row',
        //           }}
        //           borderColor={'gray.300'}
        //           backgroundColor={'gray.100'}
        //         >
        //           <Text marginRight={2} variant={'button'}>
        //             See All
        //           </Text>
        //           <Icons.ArrowRight fontSize={24} stroke={'black'} />
        //         </Pressable>
        //       }
        //     />
        //   </ScrollView>
        // </View>
      )}
    </View>
  );
};

export default FlatListProductCategory;
