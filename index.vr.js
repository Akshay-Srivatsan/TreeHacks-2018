import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Box
} from 'react-vr';

export default class WelcomeToVR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 1,
    }
  }
  render() {
    return (
      <View>
        <Pano source={asset('chess-world.jpg')}/>
        <Text
          style={{
            backgroundColor: '#777879',
            fontSize: 0.8,
            fontWeight: '400',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 0, -3]}],
          }}>
          hello
        </Text>
        <Box
          dimHeight={this.state.height}
          style={{
            color: 'blue',
            transform: [{translate: [0, -1, -3]}]
          }}
        />
      </View>
    );
  }
  componentDidMount() {
    var fn = (time) => {
      this.state.height = Math.sin(time/100) + 1;
      this.forceUpdate();
      requestAnimationFrame(fn);
    };
    requestAnimationFrame(fn);
  }
};

AppRegistry.registerComponent('WelcomeToVR', () => WelcomeToVR);
