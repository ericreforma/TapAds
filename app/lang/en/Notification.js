export const NotificationText = {
  title: 'Notification',
  noData: '-- No notification available --',
  data: [
    {
      action: 1,
      defaultMessage: [
        'sent you a message'
      ],
      image: [
        require('../../assets/image/icons/mail_icon.png')
      ]
    }, {
      action: 2,
      defaultMessage: [
        'approved your post',
        'approved your post',
        'rejected your post'
      ],
      image: [
        require('../../assets/image/icons/approve_icon.png'),
        require('../../assets/image/icons/approve_icon.png'),
        require('../../assets/image/icons/reject_icon.png'),
      ]
    }, {
      action: 3,
      defaultMessage: [
        'sent payment',
        'sent payment'
      ],
      image: [
        require('../../assets/image/icons/payment_icon.png'),
        require('../../assets/image/icons/payment_icon.png')
      ]
    }
  ],
};