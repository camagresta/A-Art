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

    // Set initial state here
    this.state = {
      artistName: 'none',
      title: 'none',
      year: 'none',
      isTracking: false,
      runAnimation: false,
    };
    this.renderInfo = this.renderInfo.bind(this);
    this.getARScene = this.getARScene.bind(this);
    // bind 'this' to functions
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
            height={0.17}
            width={0.12}
          >
            <ViroFlexView style={styles.cardWrapper}>
              <ViroText
                textClipMode="None"
                text={this.state.title}
                scale={[0.035, 0.035, 0.035]}
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
          target={'Cypresses'}
          onAnchorFound={() =>
            this.setState({
              runAnimation: true,
              artistName: 'VanGogh',
              title: 'Cypresses',
              year: '1889',
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
  Cypresses: {
    source: require('./res/Cypresses.jpg'),
    orientation: 'Up',
    physicalWidth: 0.08, // real world width in meters
  },
});
ViroMaterials.createMaterials({
  imagePlaceholder: {
    diffuseColor: 'rgba(255,255,255,1)',
  },
  quad: {
    diffuseColor: 'rgba(0,0,0,0.5)',
  },
});

ViroAnimations.registerAnimations({
  animateImage: {
    properties: {
      positionX: 0.2,
      opacity: 1.0,
    },
  },
});
var styles = StyleSheet.create({
  textStyle: {
    flex: 0.5,
    fontFamily: 'Roboto',
    fontSize: 50,
    color: 'white',
    textAlignVertical: 'top',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'column',
  },
  cardWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 0.001,
    flex: 0.5,
  },
  subText: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 0.5,
  },
});

module.exports = HelloWorldSceneAR;
