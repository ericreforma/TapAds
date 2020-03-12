import React, { useState } from 'react';
import {
  MenuContainer,
  MenuButton,
  MenuImage,
  MenuModal,
  MenuModalContentWrapper,
  MenuCloseButton,
  MenuCloseLabel,
  MenuModalContentBody,
  MenuModalContentBodyTopContainer,
  MenuModalContentBodyButton,
  MenuModalContentBodyBottomContainer,
  MenuBodyDescriptionWrapper,
  DescriptionLabel,
  MenuLogoutButton,
  MenuModalContainer,
  MenuModalContentBodyButtonLine,
  MenuLogoutLoader,
  MenuLogoutWrapper
} from './MenuStyledComponents';
import { MenuContent } from '../../../lang/en';
import { CommonText, LabelText } from '../../Text';
import NavigationService from '../../../services/navigation';
import { AuthController } from '../../../controllers';
import { IfElse, Then, Else } from '../../../components/IfElse';

const menuImageSource = require('../../../assets/image/icons/navigation_icon.png');

const Menu = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const toggleModal = () => setModalVisible(!modalVisible);

  const navigateToPage = page => () => {
		if(page === 'logout') {
      setLoggingOut(!loggingOut);
			AuthController.logout()
			.then(() => {
        toggleModal();
			  NavigationService.navigate('Loading');
				props.resetPropsValues();
			})
			.catch((e) => {
				console.log("error");
				console.log(e);
			});
		} else {
      toggleModal();
			NavigationService.navigate(page);
		}
  }
  
  return (
    <MenuContainer>
      <MenuButton onPress={toggleModal}>
        <MenuImage source={menuImageSource} />
      </MenuButton>

      <MenuModal
        isVisible={modalVisible}
        onSwipeComplete={toggleModal}
        swipeDirection={['right']}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        onBackdropPress={toggleModal}
        onBackButtonPress={toggleModal}>
        <MenuModalContainer>
          <MenuModalContentWrapper>
            <MenuCloseButton onPress={toggleModal}>
              <MenuCloseLabel>X</MenuCloseLabel>
            </MenuCloseButton>
            
            <MenuModalContentBody>
              <MenuModalContentBodyTopContainer>
                {MenuContent.nav.map((nav, key) =>
                  <MenuModalContentBodyButtonLine key={key} index={key}>
                    <MenuModalContentBodyButton onPress={navigateToPage(nav.route)}>
                      <CommonText color="white">{'<'}</CommonText>
                      <LabelText color="white" textAlign='right'>{nav.label}</LabelText>
                    </MenuModalContentBodyButton>
                  </MenuModalContentBodyButtonLine>
                )}
              </MenuModalContentBodyTopContainer>

              <MenuModalContentBodyBottomContainer>
                <MenuBodyDescriptionWrapper>
                  <DescriptionLabel>
                    {MenuContent.description}
                  </DescriptionLabel>
                </MenuBodyDescriptionWrapper>

                <MenuLogoutWrapper>
                  <IfElse condition={loggingOut}>
                    <Then>
                      <MenuLogoutLoader />
                    </Then>

                    <Else>
                      <MenuLogoutButton onPress={navigateToPage('logout')}>
                        <LabelText color="white">
                          {MenuContent.logout}
                        </LabelText>
                      </MenuLogoutButton>
                    </Else>
                  </IfElse>
                </MenuLogoutWrapper>
              </MenuModalContentBodyBottomContainer>
            </MenuModalContentBody>
          </MenuModalContentWrapper>
        </MenuModalContainer>
      </MenuModal>
    </MenuContainer>
  );
}

export default Menu;