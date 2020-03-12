import React, { useState } from 'react';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';

import NavigationService from '../../services/navigation';
import { UserController } from '../../controllers/UserController';
import { USER } from '../../redux/actions/types.action';

import { CommonText } from '../../components/Text';
import styles from '../../styles/page.Notification.style';
import NotificationCard from '../../components/NotificationCard';
import PageLayout from '../../components/PageLayout';
import PageContainer from '../../components/PageContainer';
import { IfElse, Then, Else } from '../../components/IfElse';
import {
  NotifContainer,
  NotifHeaderWrapper,
  NotifHeaderLabel,
  NotifContentContainer,
  NotifContentLoader,
  NotifContentNoData,
  NotifContentWrapper,
  NotifContentLabelWrapper,
  NotifContentTitleLabel,
  NotifContentSubTitleLabel,
  NotifContentIcon
} from './NotificationContentStyledComponents';
import { NotificationText } from '../../lang/en';
import { UserAction } from '../../redux/actions/user.action';

const NotificationPage = props => {
  const [content, setContent] = useState([]);
  const [loader, setLoader] = useState(true);

  const getNotificationContent = () => {
		UserController.request.notificationContent()
		.then(res => {
      setContent(content.concat(res.data));
      setLoader(false);
		})
		.catch(err => {
			console.log(err);
			console.log(err.response);
		});
  }

  const removeNotification = () => {
    setContent([]);
    setLoader(true);
	}

	const notificationOnPress = (notif) => () => {
    const { action } = notif;
    let args = {};
    let actionToPass = '';

		if(action == 1) {
      args = {
        clientId: notif.id,
        campaignId: notif.campaign_id,
        vehicleId: notif.user_vehicle_id
      };
      actionToPass = 'chat';
      NavigationService.navigate('Chat', {chatDetails: args});
		} else if(action == 2) {
      args = {user_campaign_id: notif.id};
      actionToPass = 'campaign';
			NavigationService.navigate('MyCampaign');
		} else {
      args = {user_withdrawal_id: notif.id};
      actionToPass = 'payment';
      NavigationService.navigate('Profile');
    }
    console.log({args});
    console.log({actionToPass})
    props.updateNotification(args, actionToPass);
  }
  
  const NotificationContentCard = ({notif}) => {
    const data = NotificationText.data.find(d => d.action === notif.action);
    const subtitle = notif.subtitle ? notif.subtitle : data.defaultMessage[notif.request_status];
    const iconSource = data.image[notif.request_status];

    return (
      <NotifContentWrapper
        onPress={notificationOnPress(notif)}>
        <NotifContentLabelWrapper>
          <NotifContentTitleLabel
            numberOfLines={1}>
            {notif.title}
          </NotifContentTitleLabel>
          
          <NotifContentSubTitleLabel
            numberOfLines={1}>
            {subtitle}
          </NotifContentSubTitleLabel>
        </NotifContentLabelWrapper>

        <NotifContentIcon source={iconSource} />
      </NotifContentWrapper>
    )
  }
  
  return (
    <PageLayout
      notif
      reInitializePage={getNotificationContent}>
      <NavigationEvents
        onWillFocus={getNotificationContent}
        onWillBlur={removeNotification} />

      <PageContainer
        style={styles.notifPageScrollView}
        overScrollMode='never'
        showsVerticalScrollIndicator={false}>
        <NotifContainer>
          <NotifHeaderWrapper>
            <NotifHeaderLabel>
              {NotificationText.title}
            </NotifHeaderLabel>
          </NotifHeaderWrapper>

          <NotifContentContainer>
            <IfElse condition={loader}>
              <Then>
                <NotifContentLoader color="#fff" />
              </Then>

              <Else>
                <IfElse condition={content.length !== 0}>
                  <Then>
                    {content.map((notif, index) =>
                      <NotificationContentCard
                        key={index}
                        notif={notif} />
                    )}
                  </Then>

                  <Else>
                    <NotifContentNoData>
                      <CommonText color="white">
                        {NotificationText.noData}
                      </CommonText>
                    </NotifContentNoData>
                  </Else>
                </IfElse>
              </Else>
            </IfElse>
          </NotifContentContainer>
        </NotifContainer>
      </PageContainer>
    </PageLayout>
  )
}

const mapStateToProps = state => ({
  notification: state.userReducer.notification
});

const mapDispatchToProps = (dispatch) => ({
  updateNotification: (args, action) =>
    dispatch(UserAction.updateNotification(args, action))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage);
  