/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
'use strict';

import React, { Component } from 'react'
import { View, StyleSheet, ensureComponentIsNative } from 'react-native';
import { Image } from 'react-native-expo-image-cache';

export default class ImageBackground extends Component {
  setNativeProps(props) {
    const viewRef = this._viewRef;
    if (viewRef) {
      ensureComponentIsNative(viewRef);
      viewRef.setNativeProps(props);
    }
  }

  _viewRef = null;

  _captureRef = ref => {
    this._viewRef = ref;
  };

  render() {
    const { children, style, imageStyle, imageRef, ...props } = this.props;

    return (
      <View accessibilityIgnoresInvertColors style={style} ref={this._captureRef}>
        <Image
          {...props}
          style={[
            StyleSheet.absoluteFill,
            {
              width: style.width,
              height: style.height,
            },
            imageStyle,
          ]}
          ref={imageRef}
        />
        {children}
      </View>
    );
  }
}
