import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux'
import ImageViewer from 'react-native-image-zoom-viewer';
import { Entypo } from '@expo/vector-icons';

import styles from '../../constants/styles'

class PhotosDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Photos',
      headerTitleStyle: styles.textLarge
    }
  }

  render() {
    const {images, navigation} = this.props
    const index = navigation.getParam('itemId', 0);

    return (
      <ImageViewer
         backgroundColor="#222"
         imageUrls={images.filter(image => image.visible)}
         index={index}
         renderFooter={(currentIndex) => (
           <View style={{padding: 10}}>
             <Text style={[styles.textLarge, styles.textGray]}>{images[currentIndex].title}</Text>
           </View>
         )}
       />
    );
  }
}

const mapStateToProps = state => {
  return {
    images: state.photos.images
  }
};

export default connect(mapStateToProps)(PhotosDetailScreen);
