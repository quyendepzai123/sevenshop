import { useState } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Box, Pressable, Text, Toast } from 'native-base';
import { useTranslation } from 'react-i18next';
import * as Icon from 'react-native-feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import FlatListVoucher from 'components/FlatListVoucher';
import SSHeaderNavigation from 'components/SSHeaderNavigation';
import SSTextInput from 'components/SSTextInput';
import useGetVouchersUser from 'hook/voucher/useGetVouchersUser';
import voucherAPI from 'modules/voucherAPI';
import { AppNavigationProp } from 'providers/navigation/types';

const VoucherScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<AppNavigationProp>();

  const { vouchers, err_vouchers, loading_vouchers, mutate_vouchers } = useGetVouchersUser();

  //how to check err_vouchers 401 and navigate to login screen
  if (err_vouchers && err_vouchers.response.status === 401) {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  }

  const [voucher, setVoucher] = useState('');
  const addVoucher = async () => {
    try {
      if (voucher === '')
        Toast.show({
          title: 'Please select type of color & size',
          placement: 'top',
        });
      else {
        await voucherAPI.addVoucherUser(voucher);
        Toast.show({
          title: 'Successfully added voucher to account',
          placement: 'top',
        });
        mutate_vouchers();
      }
    } catch (error: any) {
      Toast.show({
        title: 'Cannot add voucher to account',
        description: error.response.data.message ? error.response.data.message : error.message,
        placement: 'top',
      });
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 10,
        backgroundColor: 'white',
      }}
    >
      <SSHeaderNavigation
        tabHeaderSearchEnabled={false}
        titleHeaderSearchEnabled={false}
        iconSearchEnabled={false}
        iconOther={false}
        titleHeaderSearch={''}
        titleHeaderScreen={'Voucher'}
        iconRightHeaderScreen={false}
        iconRightHeaderCart={false}
      />
      <SSTextInput
        width="100%"
        placeholder={t('SelectVoucher.title')}
        typePassword={false}
        inputLeftElement={<Icon.Gift strokeWidth={1} stroke={'black'} />}
        inputRightElement={
          <Pressable onPress={() => addVoucher()}>
            <Icon.PlusCircle strokeWidth={1} stroke={'black'} />
          </Pressable>
        }
        value={voucher}
        changeValue={setVoucher}
      />
      <Box marginBottom={3} />
      {err_vouchers ? (
        <Text variant="title" alignSelf="center">
          Failed to load: {err_vouchers.response.data.message}
        </Text>
      ) : (
        <FlatListVoucher vouchers={vouchers?.data.results.unused} isLoading={loading_vouchers} />
      )}
    </SafeAreaView>
  );
};

export default VoucherScreen;
