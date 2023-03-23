import React, { useState } from 'react';
import { Pressable, Text, View, Button, Modal, Switch } from 'native-base';
import * as Icon from 'react-native-feather';
import SSHeaderNavigation from 'components/SSHeaderNavigation';
import SSInputPopupPass from '../../components/SSInputPopupPass';

const AccountSettingScreen = () => {
  const [showModalLanguege, setShowModalLanguege] = useState(false);
  const [showModalChangePass, setShowModalChangePass] = useState(false);
  const [password, setPassword] = useState('123');

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View py={10} backgroundColor={'white'}>
      <SSHeaderNavigation
        tabHeaderSearchEnabled={false}
        titleHeaderSearchEnabled={true}
        titleHeaderSearch="Your Favorites"
        iconSearchEnabled={true}
        iconOther={false}
        titleHeaderScreen="Account Settings"
        iconRightHeaderScreen={false}
        quantityItems={12}
        iconRightHeaderCart={false}
        quantityHeaderCarts={0}
      />

      <View h={'100%'} mt={5}>
        <View flexDirection={'row'} px={3} alignItems={'center'}>
          <Icon.User stroke="black" width={24} height={24} />
          <Text variant={'subtitle1'} ml={2}>
            Account
          </Text>
        </View>

        <Pressable
          flexDirection={'row'}
          justifyContent={'space-between'}
          borderBottomWidth={'1'}
          borderColor={'gray.400'}
          alignItems={'center'}
          h={'6%'}
          px={3}
        >
          <Text variant={'body1'}>Account & Security</Text>
          <Icon.ChevronRight stroke="black" width={24} height={24} />
        </Pressable>

        <Pressable
          flexDirection={'row'}
          justifyContent={'space-between'}
          borderBottomWidth={1}
          borderColor={'gray.400'}
          alignItems={'center'}
          h={'6%'}
          px={3}
        >
          <Text variant={'body1'}>Addresses</Text>
          <Icon.ChevronRight stroke="black" width={24} height={24} />
        </Pressable>

        <Pressable
          flexDirection={'row'}
          justifyContent={'space-between'}
          borderBottomWidth={1}
          borderColor={'gray.400'}
          alignItems={'center'}
          h={'6%'}
          px={3}
        >
          <Text variant={'body1'}>Payment method</Text>
          <Icon.ChevronRight stroke="black" width={24} height={24} />
        </Pressable>

        <Pressable
          flexDirection={'row'}
          justifyContent={'space-between'}
          borderBottomWidth={1}
          borderColor={'gray.400'}
          alignItems={'center'}
          h={'6%'}
          px={3}
          onPress={() => setShowModalChangePass(true)}
        >
          <Text variant={'body1'}>Change Password</Text>
          <Icon.ChevronRight stroke="black" width={24} height={24} />
        </Pressable>

        <View
          h={'9%'}
          justifyContent={'space-around'}
          px={3}
          borderBottomWidth={1}
          borderColor={'gray.400'}
        >
          <Pressable flexDirection={'row'} justifyItems={'center'} mt={2}>
            <Icon.Settings stroke="black" width={24} height={24} />
            <Text ml={2} variant={'subtitle1'}>
              Settings
            </Text>
          </Pressable>
          <View flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Text variant={'body1'}>Notification Settings</Text>
            <Switch
              size="md"
              trackColor={{ false: '#767577', true: '#f62822' }}
              thumbColor={isEnabled ? '#ac1506' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            {/* <Switch onTrackColor="primary.400" onThumbColor="primary.600" offThumbColor="primary.600" /> */}
          </View>
        </View>

        <Pressable
          flexDirection={'row'}
          justifyContent={'space-between'}
          borderBottomWidth={1}
          borderColor={'gray.400'}
          alignItems={'center'}
          h={'6%'}
          px={3}
          onPress={() => setShowModalLanguege(true)}
        >
          <Text variant={'subtitle1'}>Language</Text>
          <Icon.ChevronRight stroke="black" width={24} height={24} />
        </Pressable>

        <View
          h={'9%'}
          justifyContent={'space-around'}
          px={3}
          borderBottomWidth={1}
          borderColor={'gray.400'}
        >
          <Pressable flexDirection={'row'} justifyItems={'center'}>
            <Icon.Headphones stroke="black" width={24} height={24} />
            <Text variant={'subtitle1'} ml={2}>
              Support
            </Text>
          </Pressable>
          <View flexDirection={'row'} justifyContent={'space-between'}>
            <Text variant={'body1'}>Help Centre</Text>
            <Icon.ChevronRight stroke="black" width={24} height={24} />
          </View>
        </View>
        <Pressable
          flexDirection={'row'}
          justifyContent={'space-between'}
          borderBottomWidth={1}
          borderColor={'gray.400'}
          alignItems={'center'}
          h={'6%'}
          px={3}
        >
          <Text variant={'subtitle1'}>About</Text>
          <Icon.ChevronRight stroke="black" width={24} height={24} />
        </Pressable>

        <View p={3} mt={3}>
          <Button
            width={'100%'}
            backgroundColor={'white'}
            borderWidth={1}
            borderColor={'primary.600'}
          >
            <Text variant={'button'} color="primary.600">
              Log out
            </Text>
          </Button>
        </View>
      </View>
      <Modal isOpen={showModalLanguege} onClose={() => setShowModalLanguege(false)}>
        <Modal.Content width={'100%'} style={{ marginBottom: 0, marginTop: 'auto' }}>
          {/* <Modal.CloseButton /> */}

          <View
            flexDirection={'row'}
            justifyContent={'space-between'}
            backgroundColor={'primary.600'}
            h={35}
            px={2}
            alignItems={'center'}
          >
            <Text variant={'title'} color="white">
              Language
            </Text>
            <Icon.X stroke="white" strokeWidth={2} width={18} height={18} />
          </View>

          <View p={3} justifyContent={'space-between'} h={230}>
            <Pressable
              h={10}
              borderRadius={5}
              backgroundColor={'white'}
              borderWidth={1}
              alignItems={'center'}
            >
              <Text variant={'title'}>Việt Nam</Text>
            </Pressable>
            <Pressable
              h={10}
              borderRadius={5}
              backgroundColor={'primary.600'}
              alignItems={'center'}
            >
              <Text variant={'title'} color="white">
                EngLish
              </Text>
            </Pressable>
            <Pressable
              h={10}
              borderRadius={5}
              backgroundColor={'white'}
              borderWidth={1}
              alignItems={'center'}
            >
              <Text variant={'title'}>Korea</Text>
            </Pressable>

            <View flexDirection={'row'} justifyContent={'space-between'} mt={3}>
              <Pressable
                width="49%"
                height="43"
                borderRadius="6"
                flexDirection={'row'}
                backgroundColor={'white'}
                borderWidth={1}
                borderColor={'primary.600'}
                alignItems="center"
                justifyContent="center"
                onPress={() => {
                  setShowModalLanguege(false);
                }}
              >
                <Icon.X stroke="#ac1506" strokeWidth={2} width={18} height={18} />
                <Text color="primary.600" variant={'button'} ml={2}>
                  Close
                </Text>
              </Pressable>
              <Pressable
                width="49%"
                height="43"
                borderRadius="6"
                backgroundColor="#AC1506"
                alignItems="center"
                flexDirection={'row'}
                justifyContent="center"
              >
                <Icon.Check stroke="white" strokeWidth={2} width={18} height={18} />
                <Text ml={2} color="white" fontWeight="bold" fontSize="14">
                  Confirm
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal.Content>
      </Modal>

      <Modal isOpen={showModalChangePass} onClose={() => setShowModalChangePass(false)}>
        <Modal.Content width={'100%'} style={{ marginBottom: 0, marginTop: 'auto' }}>
          {/* <Modal.CloseButton /> */}

          <View
            flexDirection={'row'}
            justifyContent={'space-between'}
            backgroundColor={'primary.600'}
            h={'auto'}
            p={2}
            alignItems={'center'}
          >
            <Text variant={'title'} color="white">
              ChangePassWord
            </Text>
            <Icon.X stroke="white" strokeWidth={2} width={18} height={18} />
          </View>

          <View p={3} justifyContent={'space-between'} h={'auto'}>
            {/* <Pressable h={10} borderRadius={5} backgroundColor={'white'} borderWidth={1}  alignItems={'center'}>
                    <Text variant={'title'}>Việt Nam</Text>
                </Pressable>
                <Pressable h={10} borderRadius={5} backgroundColor={'primary.600'}   alignItems={'center'}>
                    <Text variant={'title'  }color='white' >EngLish</Text>
                </Pressable>
                <Pressable h={10 }borderRadius={5} backgroundColor={'white'} borderWidth={1}  alignItems={'center'}>
                    <Text variant={'title'}>Korea</Text>
                </Pressable> */}
            <SSInputPopupPass
              placeholder={'Enter Password old'}
              type={'password'}
              inputLeftElement={<Icon.Lock stroke="#1C1C1C" width={24} height={24} />}
              setEyes={true}
              value={password}
              changeValue={setPassword}
            ></SSInputPopupPass>
            <SSInputPopupPass
              placeholder={'Enter Password old'}
              type={'password'}
              inputLeftElement={<Icon.Lock stroke="#1C1C1C" width={24} height={24} />}
              setEyes={true}
              value={password}
              changeValue={setPassword}
            ></SSInputPopupPass>
            <SSInputPopupPass
              placeholder={'Enter Password old'}
              type={'password'}
              inputLeftElement={<Icon.Lock stroke="#1C1C1C" width={24} height={24} />}
              setEyes={true}
              value={password}
              changeValue={setPassword}
            ></SSInputPopupPass>
            <View flexDirection={'row'} justifyContent={'space-between'} mt={3}>
              <Pressable
                width="49%"
                height="43"
                borderRadius="6"
                flexDirection={'row'}
                backgroundColor={'white'}
                borderWidth={1}
                borderColor={'primary.600'}
                alignItems="center"
                justifyContent="center"
                onPress={() => {
                  setShowModalLanguege(false);
                }}
              >
                <Icon.X stroke="#ac1506" strokeWidth={2} width={18} height={18} />
                <Text color="primary.600" variant={'button'} ml={2}>
                  Close
                </Text>
              </Pressable>
              <Pressable
                width="49%"
                height="43"
                borderRadius="6"
                backgroundColor="#AC1506"
                alignItems="center"
                flexDirection={'row'}
                justifyContent="center"
              >
                <Icon.Check stroke="white" strokeWidth={2} width={18} height={18} />
                <Text ml={2} color="white" fontWeight="bold" fontSize="14">
                  Confirm
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal.Content>
      </Modal>
    </View>
  );
};

export default AccountSettingScreen;