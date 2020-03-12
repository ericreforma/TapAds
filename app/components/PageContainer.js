import React from 'react';
import { ScrollView } from 'react-native';
import UserInfo from '../components/UserInfo';

const PageContainer = React.forwardRef((props, ref) => {
  const { children } = props;
  delete props.children;

  return (
    <ScrollView ref={ref} {...props}>
      <UserInfo />

      {children}
    </ScrollView>
  );
});

export default PageContainer;