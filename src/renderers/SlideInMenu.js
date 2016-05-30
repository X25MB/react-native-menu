import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { computeSlideInMenuPosition } from '../helpers';

export default class ContextMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      slide: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.slide, {
      duration: 100,
      toValue: 1
    }).start();
  }

  render() {
    const { style, children, layouts, ...other } = this.props;
    const { height: oHeight } = layouts.optionsLayout;
    const { width } = layouts.windowLayout;
    const animation = {
      transform: [{
        translateY: this.state.slide.interpolate({
          inputRange: [0, 1],
          outputRange: [oHeight, 0]
        }),
      }]
    };
    const position = computeSlideInMenuPosition(layouts);
    return (
      <Animated.View style={[styles.options, { width }, style, animation, position]} {...other}>
        {children}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  options: {
    position: 'absolute',
    borderRadius: 2,
    backgroundColor: 'white',

    // Shadow only works on iOS.
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 4,

    // This will elevate the view on Android, causing shadow to be drawn.
    elevation: 5,
  },
});

