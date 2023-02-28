import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, Input, Button, Toast } from 'native-base';
import * as Icon from 'react-native-feather';
import { CheckOTPPayload } from 'interfaces/Auth';
import { authAPI } from 'modules';
import { AppNavigationProp } from 'providers/navigation/types';

const OTPScreen = (props: any) => {
  const navigation = useNavigation<AppNavigationProp>();

  const [formData, setFormData] = useState<CheckOTPPayload>({
    id: props.route.params.user_id,
    otp: '',
  });

  const onSubmit = async () => {
    try {
      const response = await authAPI.check_otp(formData);
      Toast.show({
        title: response.data.message,
        duration: 3000,
      });
      navigation.navigate('SetPassWord');
    } catch (e: any) {
      Toast.show({
        title: e.response?.data?.message,
        duration: 3000,
      });
    }
  };

  return (
    <View w={'100%'} h={'100%'} flex={1}>
      <Image
        alt="Image OTP"
        w={'100%'}
        h={250}
        borderBottomLeftRadius={12}
        borderBottomRightRadius={12}
        source={{
          uri: 'https://th.bing.com/th/id/OIP.cH80uEpp8kXrYliDjpuk2AHaFh?pid=ImgDet&rs=1',
        }}
      />
      <Text
        mt="5"
        fontFamily={'heading'}
        fontStyle={'normal'}
        fontWeight={400}
        fontSize={36}
        textAlign={'center'}
      >
        OTP Verification
      </Text>

      <View h={200} alignItems={'center'}>
        <Text
          mt={8}
          w={'80%'}
          fontSize={16}
          fontWeight={500}
          fontFamily={'heading'}
          fontStyle={'normal'}
        >
          We have sent OTP to the phone number. The expiry date is 5 minutes
        </Text>
        <View
          flexDirection={'row'}
          w={'80%'}
          alignItems={'center'}
          borderBottomWidth={1}
          px={4}
          mt={7}
        >
          <Icon.Mail stroke="black" width={24} height={24} style={{ marginRight: 5 }} />
          <Input
            fontSize={16}
            fontFamily={'heading'}
            fontStyle={'normal'}
            w={{ base: '85%' }}
            variant="unstyled"
            value={formData.otp}
            onChangeText={(value) => setFormData({ ...formData, otp: value })}
            placeholder="Enter your OTP..."
          />
        </View>

        <Button onPress={onSubmit} w={{ base: '50%' }} mb="1" mt="6" borderRadius={6}>
          <Text fontSize={14} color={'light.100'} fontWeight={'bold'}>
            Verify
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default OTPScreen;
