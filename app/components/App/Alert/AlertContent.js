import React, { useState } from 'react';
import {
  TouchableOpacity, ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';

import { IfElse, Then, Else } from '../../../components/IfElse';
import {
  AlertContainer,
  AlertTitleWrapper,
  AlertTitleLabel,
  AlertBodyWrapper,
  AlertBodyContentWrapper,
  AlertBodyContentLabel,
  AlertBodyFooterWrapper,
  AlertBodyButtonLabel,
  AlertBodyButtonIcon,
  AlertBodyProceedButton,
  AlertBodyCloseButton,
  AlertBodyDefaultButton,
  AlertButtonLabel,
  AlertLoadingWrapper,
} from './AlertStyledComponents';

export const AlertButton = ({
  buttonLabel = 'Button',
  title = 'Alert Title',
  body = 'Body lorem ipsum',
  proceedText = 'Yes',
  cancelText = 'Close',
  confirmOnPress = false,
  cancelOnPress = false,
  style = false,
  loading = false,
  children
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => setModalVisible(!modalVisible);

  const proceedToNext = () => {
    if(confirmOnPress) confirmOnPress();
  }

  const backdropOnPress = () => {
    if(!loading)
      toggleModal();
  }

  const cancelCallback = () => {
    toggleModal();
    if(cancelOnPress)
      cancelOnPress();
  }

  return (
    <>
      <TouchableOpacity style={style} onPress={toggleModal}>
        <IfElse condition={children}>
          <Then>
            {children}
          </Then>

          <Else>
            <AlertButtonLabel>
              {buttonLabel}
            </AlertButtonLabel>
          </Else>
        </IfElse>
      </TouchableOpacity>

      <Modal 
        isVisible={modalVisible}
        onBackButtonPress={backdropOnPress}
        onBackdropPress={backdropOnPress}>
        <IfElse condition={loading}>
          <Then>
            <AlertLoadingWrapper>
              <ActivityIndicator size="large" />
            </AlertLoadingWrapper>
          </Then>

          <Else>
            <AlertContainer>
              <AlertTitleWrapper>
                <AlertTitleLabel>
                  {title}
                </AlertTitleLabel>
              </AlertTitleWrapper>

              <AlertBodyWrapper>
                <AlertBodyContentWrapper>
                  <AlertBodyContentLabel>
                    {body}
                  </AlertBodyContentLabel>
                </AlertBodyContentWrapper>

                <AlertBodyFooterWrapper>
                  <IfElse condition={confirmOnPress}>
                    <Then>
                      <AlertBodyProceedButton onPress={proceedToNext}>
                        <AlertBodyButtonLabel>
                          <AlertBodyButtonIcon name="check" />
                          {' ' + proceedText}
                        </AlertBodyButtonLabel>
                      </AlertBodyProceedButton>

                      <AlertBodyCloseButton onPress={cancelCallback}>
                        <AlertBodyButtonLabel>
                          <AlertBodyButtonIcon name="times" />
                          {' ' + cancelText}
                        </AlertBodyButtonLabel>
                      </AlertBodyCloseButton>
                    </Then>

                    <Else>
                      <AlertBodyDefaultButton onPress={cancelCallback}>
                        <AlertBodyButtonLabel>
                          <AlertBodyButtonIcon name="times" />
                          {' ' + cancelText}
                        </AlertBodyButtonLabel>
                      </AlertBodyDefaultButton>
                    </Else>
                  </IfElse>
                </AlertBodyFooterWrapper>
              </AlertBodyWrapper>
            </AlertContainer>
          </Else>
        </IfElse>
      </Modal>
    </>
  );
}

export const AlertFunction = ({
  title = 'Alert Title',
  body = 'Body lorem ipsum',
  proceedText = 'Yes',
  cancelText = 'Close',
  confirmOnPress = false,
  cancelOnPress = false,
  loading = false,
  isVisible,
  toggleModal
}) => {
  const proceedToNext = () => {
    if(confirmOnPress) confirmOnPress();
  }

  const backdropOnPress = () => {
    if(!loading)
      toggleModal();
  }

  const cancelCallback = () => {
    toggleModal();
    if(cancelOnPress)
      cancelOnPress();
  }

  return (
    <Modal 
      isVisible={isVisible}
      onBackButtonPress={backdropOnPress}
      onBackdropPress={backdropOnPress}>
      <IfElse condition={loading}>
        <Then>
          <AlertLoadingWrapper>
            <ActivityIndicator size="large" />
          </AlertLoadingWrapper>
        </Then>

        <Else> 
          <AlertContainer>
            <AlertTitleWrapper>
              <AlertTitleLabel>
                {title}
              </AlertTitleLabel>
            </AlertTitleWrapper>

            <AlertBodyWrapper>
              <AlertBodyContentWrapper>
                <AlertBodyContentLabel>
                  {body}
                </AlertBodyContentLabel>
              </AlertBodyContentWrapper>

              <AlertBodyFooterWrapper>
                <IfElse condition={confirmOnPress}>
                  <Then>
                    <AlertBodyProceedButton onPress={proceedToNext}>
                      <AlertBodyButtonLabel>
                        <AlertBodyButtonIcon name="check" />
                        {' ' + proceedText}
                      </AlertBodyButtonLabel>
                    </AlertBodyProceedButton>

                    <AlertBodyCloseButton onPress={cancelCallback}>
                      <AlertBodyButtonLabel>
                        <AlertBodyButtonIcon name="times" />
                        {' ' + cancelText}
                      </AlertBodyButtonLabel>
                    </AlertBodyCloseButton>
                  </Then>

                  <Else>
                    <AlertBodyDefaultButton onPress={cancelCallback}>
                      <AlertBodyButtonLabel>
                        <AlertBodyButtonIcon name="times" />
                        {' ' + cancelText}
                      </AlertBodyButtonLabel>
                    </AlertBodyDefaultButton>
                  </Else>
                </IfElse>
              </AlertBodyFooterWrapper>
            </AlertBodyWrapper>
          </AlertContainer>
        </Else>
      </IfElse>
    </Modal>
  );
}