import React from 'react';
// import 'webvr-polyfill';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Box,
  PointLight,
  Image
} from 'react-vr';

var NUM_CHANNELS = 12;
var COLORS = [
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#00FFFF',
  '#FF00FF',
  '#FF8800',
  '#00FF88',
  '#8800FF',
  '#88FF00',
  '#0088FF',
  '#FF0088'
]

export default class WelcomeToVR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heights: new Array(NUM_CHANNELS),
      colors: new Array(NUM_CHANNELS),
      loudness: 1,
    }
  }
  render() {
    return (
      <View>
        <Pano source={asset('space.jpg')}/>
        <Text
          style={{
            backgroundColor: '#77007900',
            fontSize: 1,
            fontWeight: '400',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 1, -5]}],
          }}>
          MUSIC
        </Text>
        {this.state.heights.map((height, i) => {
          return <Box
          key={'bar-' + i}
          dimHeight={height}
          dimWidth={0.5}
          dimDepth={0.5}
          lit={true}
          style={{
            color: this.state.colors[i],
            opacity: 0.6,
            transform: [{translate: [i - NUM_CHANNELS/2, -1, -3]}]
          }}
          />
        })}
        <Image
          source={asset('cover_art.jpg')}
          style={{
            transform: [{translate: [0, 1, -5]}],
            height: 5,
            width: 5,
            layoutOrigin: [0.5, 0.5]
          }}
        />

        <PointLight/>
      </View>
    );
  }
  componentDidMount() {
    var COLOURS = COLORS.slice();
    for (var i = 0; i < NUM_CHANNELS; i++) {
      this.state.heights[i] = 1;
      var index = Math.floor(Math.random()*COLOURS.length);
      this.state.colors[i] = COLOURS[index];
      COLOURS.splice(index, 1);
    }
    var fn = (time) => {
      for (var i = 0; i < NUM_CHANNELS; i++) {
        this.state.heights[i] = Math.sin(time/(50*(i+1))) + 1;
      }
      this.forceUpdate();
      requestAnimationFrame(fn);
    };
    requestAnimationFrame(fn);
  }
};

AppRegistry.registerComponent('WelcomeToVR', () => WelcomeToVR);
