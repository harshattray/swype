import React, { Component } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Dimensions
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.5 * Dimensions.get('window').width;
const SWIPE_DURATION = 250


class Stash extends Component {
  constructor(props) {
    super(props);
    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => { //info abt user actions ->gesture
        console.log(gesture);
        position.setValue({
          x: gesture.dx,
          y: gesture.dy,
        });
      },
      onPanResponderRelease: (event, gesture) => {
        if(gesture.dx> SWIPE_THRESHOLD){
          this.forceRight('right');
        }
        else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceLeft('left');
        }
        else {
          this.resetCard();
        }
      }
    });
    this.state = { panResponder, position };
  }

  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    });
    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }
  resetCard() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }
  forceRight(direction) {
    const flow = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.state.position, {
      toValue: { x: flow, y: 0 },
      duration: SWIPE_DURATION
    }).start();
  }
  renderCards() {
    return this.props.data.map((item, index) => {
      if (index === 0) {
        return (
          <Animated.View
            key={item.id}
            style={this.getCardStyle()}
            {...this.state.panResponder.panHandlers}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      }
      return this.props.renderCard(item);
    });
  }
  render() {
    return (
     <View>
       {this.renderCards()}
     </View>
    );
  }
}

export default Stash;
