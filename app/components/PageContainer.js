import React from 'react';
import { ScrollView } from 'react-native';
import UserInfo from '../components/UserInfo';

const PageContainer = props => {
  const { children } = props;
  delete props.children;

  return (
    <ScrollView {...props}>
      <UserInfo />

      {children}
    </ScrollView>
  );
}

export default PageContainer;