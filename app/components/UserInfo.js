
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import styles from '../styles/component.HeaderNav.style';
import { UserController } from '../controllers';

class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: [],
      rate: 12
    };
  }

  componentDidMount() {
    this.setState({
      user: this.props.user,
      rate: UserController.rating(this.props.user.ratings)
    });
  }

  rating = () => (
      <View
          style={styles.headerNavUserStarContainer}
      >
          {Array(5).fill(0).map((star, starIndex) =>
              <Image
                  key={starIndex}
                  style={styles.headerNavUserStar}
                  source={
                      (
                          starIndex < Math.trunc(this.state.rate.average)
                          ? require('../assets/image/icons/star_highlight_icon.png')
                          : require('../assets/image/icons/star_icon.png')
                      )
                  }
              />
          )}
      </View>
    );


    render() {
        return (
            <View
                style={styles.HeaderNavContainer}
            >
                <View
                    style={[styles.headerNavCenter, styles.headerNavProfilePicture]}
                >
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => this.props.navigation.navigate('Profile')}
                    >
                        <Image
                            style={styles.headerNavProfilePictureImage}
                            source={this.props.profilePicture}
                        />
                    </TouchableOpacity>
                </View>

                <View
                    style={[styles.headerNavCenter, styles.headerNavUserContainer]}
                >
                    <Text
                        style={styles.headerNavUserName}
                    >
                        { this.state.user.name }
                    </Text>

                    <View
                        style={styles.headerNavRowDirection}
                    >
                        <Text
                            style={styles.headerNavUserRating}
                        >
                            { this.state.rate.average }
                        </Text>

                        {this.rating()}

                        <Text
                            style={styles.headerNavUserTotalRating}
                        >
                            ( {this.state.rate.count} )
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}
const mapStateToProps = (state) => ({
  user: state.userReducer.user
});

export default connect(mapStateToProps)(UserInfo);
