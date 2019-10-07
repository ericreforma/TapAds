import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import theme from '../styles/theme.style';

export default class AutoComplete extends Component {
    filteredData = (m) => {
        if(this.props.name === 'year') {
            return m[this.props.name].toString().toLowerCase().indexOf(this.props.text.toString().toLowerCase()) !== -1 && this.props.manufacturer.toString().toLowerCase() === m.manufacturer.toString().toLowerCase() && this.props.model.toString().toLowerCase() === m.model.toString().toLowerCase();
        } else if(this.props.name === 'model') {
            return m[this.props.name].toString().toLowerCase().indexOf(this.props.text.toLowerCase()) !== -1 && this.props.manufacturer.toString().toLowerCase() === m.manufacturer.toString().toLowerCase();
        } else {
            return m[this.props.name].toString().toLowerCase().indexOf(this.props.text.toLowerCase()) !== -1;
        }
    }

    render() {
        return (
            <View
                style={{
                    position: 'absolute',
                    top: 40,
                    left: 0,
                    width: '100%',
                    borderRadius: 1,
                    borderWidth: 1,
                    borderTopWidth: 0,
                    borderColor: theme.COLOR_GRAY_MEDIUM,
                    backgroundColor: theme.COLOR_WHITE,
                    zIndex: 10
                }}
            >
                {this.props.data.map(m =>
                    this.filteredData(m)
                    && this.props.text.toLowerCase() !== m[this.props.name].toString().toLowerCase() ? (
                        <TouchableOpacity
                            key={m.id}
                            onPress={e => this.props.carDetailsOnChangeText(m[this.props.name].toString())}
                        >
                            <Text
                                style={{
                                    paddingHorizontal: 10,
                                    paddingVertical: 5
                                }}
                            >{m[this.props.name]}</Text>
                        </TouchableOpacity>
                    ) : null
                )}
            </View>
        );
    }
}
