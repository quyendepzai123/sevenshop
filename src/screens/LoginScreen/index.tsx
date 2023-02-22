import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, Image, Toast, Center, Button, VStack, Input, FormControl } from 'native-base';
import { TextInput, TouchableOpacity } from 'react-native';
import { clearAuthTokens, getRefreshToken } from 'react-native-axios-jwt';
import * as Icon from 'react-native-feather';
import { RefreshTokenPayload, SignInPayload } from 'interfaces/Auth';
import { authAPI } from 'modules/api';
import { AppNavigationProp } from 'providers/navigation/types';
import styles from './style';
type Props = object;

const LoginScreen = (props: Props) => {
  const [formData, setFormData] = useState<SignInPayload>({
    email: 'levanchunq123@gmail.com',
    password: '123456',
  });
  const [refreshToken, setRefreshToken] = useState<RefreshTokenPayload>({ refresh_token: '' });
  const navigation = useNavigation<AppNavigationProp>();

  const onSubmit = async () => {
    clearAuthTokens();
    try {
      const response = await authAPI.login(formData);
      Toast.show({
        title: response.data.message,
        duration: 3000,
      });
      navigation.navigate('Main');
    } catch (e: any) {
      Toast.show({
        title: e.response?.data?.message,
        duration: 3000,
      });
    }
  };

  const fetchData = async () => {
    try {
      const response = await authAPI.me();
      Toast.show({
        title: response.data.result.email,
        duration: 3000,
      });
    } catch (e: any) {
      Toast.show({
        title: e.response?.data?.message,
        duration: 3000,
      });
    }
  };

  const logout = async () => {
    getRefreshToken().then((token) => {
      setRefreshToken({ refresh_token: token });
    });
    try {
      const response = await authAPI.logout(refreshToken);
      Toast.show({
        title: response.data.message,
        duration: 3000,
      });
      clearAuthTokens();
    } catch (e: any) {
      Toast.show({
        title: e.response?.data?.message,
        duration: 3000,
      });
    }
  };

  return (
    <Center flex="1">
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="h4">Heading 4</Text>
      <Text variant="title">Title</Text>
      <Text variant="subtitle1">Subtitle 1</Text>
      <Text variant="subtitle2">Subtitle 2</Text>
      <Text variant="body1">Body 1</Text>
      <Text variant="body2">Body 2</Text>
      <Text variant="button">BUTTON</Text>
      <Text variant="caption">Caption</Text>
      <Text variant="overline">OVERLINE</Text>
      <Button variant="primary" endIcon={<></>}>
        Button
      </Button>
      <VStack width="90%" mx="3" maxW="300px">
        <FormControl isRequired>
          <FormControl.Label
            _text={{
              bold: true,
            }}
          >
            Email
          </FormControl.Label>
          <Input
            placeholder="Email"
            autoComplete="email"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={(value) => setFormData({ ...formData, email: value })}
            style={styles.inputuser}
            // placeholder="Enter your email/phone number"
          />
        </FormControl>

        <View style={styles.viewPass}>
          <Icon.Lock stroke="black" width={24} height={24} style={{ marginRight: 5 }} />
          <TextInput
            value={formData.password}
            onChangeText={(value) => setFormData({ ...formData, password: value })}
            style={styles.inputuser}
            placeholder="Enter your password"
            secureTextEntry={true}
          />
          <Icon.EyeOff stroke="black" width={24} height={24} />
        </View>
        <View style={{ width: '80%' }}>
          <Text style={styles.txtFogot}>Forgot password?</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={{ fontSize: 14 }}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={{ fontSize: 14 }}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={fetchData}>
          <Text style={{ fontSize: 14 }}>Me</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 14, marginTop: 30 }}>Or login with</Text>
        <View style={styles.viewimage}>
          <Image
            alt="1"
            style={{ width: 40, height: 40 }}
            source={{
              uri: 'https://storage.googleapis.com/nexzinc/2019/06/Facebook-Icon-3-600x600.png',
            }}
          />
          <Image
            alt="1"
            style={{ width: 40, height: 40 }}
            source={{
              uri: 'https://imagepng.org/wp-content/uploads/2019/08/google-icon.png',
            }}
          />
        </View>
        <View style={{ flexDirection: 'row', marginTop: 5 }}>
          <Text style={{ fontSize: 14 }}>Don’t you have an account?</Text>
          <Text style={{ fontSize: 14, color: 'red' }}>Register</Text>
        </View>
      </VStack>
    </Center>
  );
};

export default LoginScreen;
