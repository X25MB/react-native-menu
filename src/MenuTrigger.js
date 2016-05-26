import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import { debug } from './logger.js';

export default class MenuTrigger extends Component {

  _onPress() {
    debug('trigger onPress');
    if (this.props.onPress) {
      return this.props.onPress();
    }
    this.context.menuActions.openMenu(this.props.menuName);
  }

  render() {
    const { disabled, onRef, text, children } = this.props;
    // TODO: omit props
    return (
      <TouchableWithoutFeedback onPress={() => !disabled && this._onPress()}>
        <View {...this.props} ref={onRef} collapsable={false}>
          {text ? <Text>{text}</Text> : children}
        </View>
      </TouchableWithoutFeedback>
    );
  }

}

MenuTrigger.propTypes = {
  disabled: React.PropTypes.bool,
  text: React.PropTypes.string,
  onPress: React.PropTypes.func,
};

MenuTrigger.defaultProps = {
  disabled: false,
};

MenuTrigger.contextTypes = {
  menuActions: React.PropTypes.object,
};

export default MenuTrigger;
