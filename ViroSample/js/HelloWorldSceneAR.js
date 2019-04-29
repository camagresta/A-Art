'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroNode,
  ViroFlexView,
  ViroQuad,
  ViroMaterials,
  ViroAnimations,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();

    this.state = {
      artistName: 'none',
      title: 'none',
      year: 'none',
      isTracking: false,
      runAnimation: false,
    };
    this.renderInfo = this.renderInfo.bind(this);
    this.getARScene = this.getARScene.bind(this);
  }

  renderInfo() {
    return (
      <ViroNode key="card">
        <ViroNode
          opacity={0}
          position={[0, 0, 0]}
          animation={{
            name: 'animateImage',
            run: this.state.runAnimation,
          }}
        >
          <ViroFlexView
            materials={'quad'}
            rotation={[-90, 0, 0]}
            height={0.12}
            width={0.12}
          >
            <ViroFlexView style={styles.cardWrapper}>
              <ViroText
                textClipMode="None"
                text={this.state.title}
                scale={[0.03, 0.03, 0.03]}
                style={styles.textStyle}
              />

              <ViroText
                textClipMode="None"
                text={this.state.artistName}
                scale={[0.025, 0.025, 0.025]}
                style={styles.textStyle}
              />
              <ViroText
                textClipMode="None"
                text={this.state.year}
                scale={[0.025, 0.025, 0.025]}
                style={styles.textStyle}
              />
            </ViroFlexView>
          </ViroFlexView>
        </ViroNode>
      </ViroNode>
    );
  }
  getARScene() {
    return (
      <ViroNode>
        <ViroARImageMarker
          target={'olive'}
          onAnchorFound={() =>
            this.setState({
              runAnimation: true,
              artistName: 'VanGogh',
              title: 'The Olve Trees',
              year: '1889',
            })
          }
        >
          {this.renderInfo()}
        </ViroARImageMarker>
        <ViroARImageMarker
          target={'piano'}
          onAnchorFound={() =>
            this.setState({
              runAnimation: true,
              artistName: 'Henry Matisse',
              title: 'The Piano',
              year: '1916',
            })
          }
        >
          {this.renderInfo()}
        </ViroARImageMarker>
        <ViroARImageMarker
          target={'monkey'}
          onAnchorFound={() =>
            this.setState({
              runAnimation: true,
              artistName: 'Frida Kahlo',
              title: 'Self-portrait with Monkey',
              year: '1938',
            })
          }
        >
          {this.renderInfo()}
        </ViroARImageMarker>
        <ViroARImageMarker
          target={'oxbow'}
          onAnchorFound={() =>
            this.setState({
              runAnimation: true,
              artistName: 'Thomas Cole',
              title: 'The Oxbow',
              year: '1836',
            })
          }
        >
          {this.renderInfo()}
        </ViroARImageMarker>
        <ViroARImageMarker
          target={'wolf'}
          onAnchorFound={() =>
            this.setState({
              runAnimation: true,
              artistName: 'Jackson Pollack',
              title: 'The She-Wolf',
              year: '1943',
            })
          }
        >
          {this.renderInfo()}
        </ViroARImageMarker>
      </ViroNode>
    );
  }
  render() {
    return <ViroARScene>{this.getARScene()}</ViroARScene>;
  }
}
ViroARTrackingTargets.createTargets({
  olive: {
    source: require('./res/olive.jpg'),
    orientation: 'Up',
    physicalWidth: 0.08, // real world width in meters
  },
});
ViroARTrackingTargets.createTargets({
  piano: {
    source: require('./res/piano.jpg'),
    orientation: 'Up',
    physicalWidth: 0.08, // real world width in meters
  },
});
ViroARTrackingTargets.createTargets({
  oxbow: {
    source: require('./res/oxbow.jpg'),
    orientation: 'Up',
    physicalWidth: 0.08, // real world width in meters
  },
});
ViroARTrackingTargets.createTargets({
  wolf: {
    source: require('./res/wolf.jpg'),
    orientation: 'Up',
    physicalWidth: 0.08, // real world width in meters
  },
});
ViroARTrackingTargets.createTargets({
  monkey: {
    source: require('./res/monkey.jpg'),
    orientation: 'Up',
    physicalWidth: 0.08, // real world width in meters
  },
});
ViroMaterials.createMaterials({
  imagePlaceholder: {
    diffuseColor: 'rgba(255,255,255,1)',
  },
  quad: {
    diffuseColor: 'rgba(56, 106, 217, 0.5)',
  },
});

ViroAnimations.registerAnimations({
  animateImage: {
    properties: {
      positionX: 0.1,
      opacity: 1.0,
    },
  },
});
const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Roboto',
    fontSize: 35,
    color: 'white',
    textAlignVertical: 'top',
    textAlign: 'left',
    fontWeight: 'bold',
  },

  cardWrapper: {
    alignItems: 'flex-start',
    padding: 0.001,
    flex: 1,
  },
  subText: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 0.5,
  },
});

module.exports = HelloWorldSceneAR;
