import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { ActivityIndicator, View, Button, Text } from 'react-native';
import { IfElse, Then, Else } from '../components/IfElse';

const TestPage = props => {
  const [visible, setVisible] = useState(false);
  const [loadingVisible, setLoadingVisible] = useState(false);
  let timeoutData;

  const toggleModal = () => {
    clearTimeout(timeoutData);

    if(!visible) {
      timeoutData = setTimeout(() => {
        setVisible(!visible);
        setLoadingVisible(false);
      }, 5000);
    }

    setVisible(!visible);
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: 15
      }}>
      <Button
        title="Click me"
        onPress={toggleModal} />

      <Modal
        isVisible={visible}
        onBackButtonPress={toggleModal}
        onModalHide={() => {
          setLoadingVisible(true);
        }}>
        <IfElse condition={loadingVisible}>
          <Then>
            <View
              style={{
                backgroundColor: '#fff',
                alignSelf: 'center',
                padding: 25,
                borderRadius: 10
              }}>
              <ActivityIndicator size="large" />
            </View>
          </Then>

          <Else>
            <View
              style={{
                backgroundColor: '#fff',
                padding: 15,
                borderRadius: 10
              }}>
              <Text>
                Hello
              </Text>
            </View>
          </Else>
        </IfElse>
      </Modal>
    </View>
  )
}

export default TestPage;