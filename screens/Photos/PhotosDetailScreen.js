import React, { Component } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import ImageViewer from 'react-native-image-zoom-viewer';
import { Entypo } from '@expo/vector-icons';

import styles from '../../constants/styles'

class PhotosDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Photos'
    }
  }

  render() {
    const {images, index} = this.props

    return (
      // <Modal visible={true} transparent={false}>
          <ImageViewer imageUrls={images} index={index}/>
      // </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    images: state.photos.images,
    index: state.photos.selectedPhoto
  }
};

export default connect(mapStateToProps)(PhotosDetailScreen);
