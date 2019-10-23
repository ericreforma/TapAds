import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import ButtonBlue from '../components/ButtonBlue';
import styles from '../styles/component.Card.style';
import theme from '../styles/theme.style';
import { VEHICLE } from '../config/variables';

class Card extends Component {
    render() {
        return (
            <View
                style={[
                    styles.cardContainer,
                    styles.cardRadiusBottom,
                    styles.cardRadiusTop,
                    (
                        this.props.shadow
                        ? styles.cardContainerWithShadow
                        : styles.cardContainerWithoutShadow
                    ),(
                        this.props.justifyContent
                        ? styles.cardJustifyContent
                        : styles.cardCenter
                    )
                ]}
            >
                {this.props.children}
            </View>
        );
    }
}

class CardHeader extends Component {
    render() {
        return (
            <View
                style={[
                    styles.cardPadding,
                    styles.cardRadiusTop,
                    (
                        this.props.active
                        ? styles.cardHeaderActive
                        : styles.cardHeaderInactive
                    )
                ]}
            >
                {this.props.children}
            </View>
        );
    }
}

class CardBody extends Component {
    render() {
        return (
            <View
                style={[
                    styles.cardBody,
                    (
                        this.props.header
                        ? styles.cardRadiusTop
                        : {}
                    ),
                    (
                        this.props.footer
                        ? styles.cardRadiusBottom
                        : {}
                    )
                ]}
            >
                <View
                    style={styles.cardPaddingBody}
                >
                    {this.props.children}
                </View>

                <View style={(this.props.divider ? styles.cardBodyDivider : {})}>
                </View>
            </View>
        );
    }
}

class CardFooter extends Component {
    buttonViewInfo = (viewInfo) => {
        if(viewInfo) {
            return (
                <View>
                    <ButtonBlue
                        label="View Info"
                        onPress={this.props.buttonViewOnPress}
                    />
                </View>
            );
        }
    }

    render() {
        return (
            <View
                style={[
                    styles.cardPaddingFooter,
                    styles.cardRadiusBottom,
                    (
                        this.props.active
                        ? styles.cardFooterActive
                        : styles.cardFooterInactive
                    ),
                    (
                        this.props.justifyContent
                        ? styles.cardFooterJustifyContent
                        : styles.cardFooterCenter
                    )
                ]}
            >
                <View>
                    {this.props.children}
                </View>
                {this.buttonViewInfo(this.props.buttonViewInfo)}
            </View>
        );
    }
}

class CardColumnContent extends Component {
    buttonViewInfo = (viewInfo) => {
        if(viewInfo) {
            return (
                <View style={styles.cardColumnContentButtonViewInfo}>
                    <ButtonBlue
                        label="View Info"
                        onPress={this.props.buttonViewOnPress}
                    />
                </View>
            );
        }
    }

    additionalCarInfo = (type, size) => {
        if (type != null) {
            return (
                <View style={styles.cardColumnContentCarInfo}>
                    <View
                        style={styles.cardColumnContentCarInfoImageView}
                    >
                        <Image
                            style={styles.cardColumnContentCarInfoImage}
                            source={Object.values(VEHICLE.CLASS)[size].icon.white}
                            resizeMode="contain"
                        />
                    </View>

                    <Text style={styles.cardColumnContentCarInfoType}>{Object.keys(VEHICLE.TYPE)[type]}</Text>
                </View>
            );
        }
    }

    render() {
        return (
            <View
                style={[
                    styles.cardColumnContent,
                    (
                        this.props.getCardSize
                        ? styles.cardColumnCenter
                        : styles.cardColumnContentPaddingBottom
                    ),
                    (
                        this.props.firstChild
                        ? styles.cardColumnContentFirst
                        : (
                            this.props.lastChild
                            ? styles.cardColumnContentLast
                            : styles.cardColumnContentDefault
                        )
                    ),{
                        backgroundColor: (
                            this.props.backgroundColor
                            ? this.props.backgroundColor
                            : theme.COLOR_WHITE
                        )
                    }
                ]}
                onLayout={(event) => {
                    var {x, y, width, height} = event.nativeEvent.layout;
                    if(this.props.getCardSize) {
                        this.props.getCardSize(x, y, width, height, this.props.cardIndex);
                    }
                }}
            >
                <View>
                    {this.props.children}
                </View>

                {this.additionalCarInfo(this.props.carType, this.props.carSize)}
                {this.buttonViewInfo(this.props.buttonViewInfo)}
            </View>
        );
    }
}

class CardColumnContentBody extends Component {
    render() {
        return (
            <View>
                <View
                    style={styles.cardColumnContentBody}
                >
                    {this.props.children}
                </View>

                <View
                    style={
                        (
                            this.props.divider
                            ? styles.cardBodyContentDivider
                            : {}
                        )
                    }
                ></View>
            </View>
        );
    }
}

export {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardColumnContent,
    CardColumnContentBody
};
