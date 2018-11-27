import React from 'react';
import { View, Image, ScrollView, TouchableHighlight, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux'
import { Entypo } from '@expo/vector-icons';

import { onPhotoOpen } from '../../reducers/photosReducer'
import styles from '../../constants/styles'

class PhotosScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Photos',
      headerLeft: (
        <TouchableOpacity style={styles.homeIcon} onPress={() => navigation.navigate('Home')}>
          <Entypo name="home" size={30} color="#000" />
        </TouchableOpacity>
      ),
      headerTitleStyle: styles.textLarge
    }
  }

  constructor() {
    super()

    this.renderImages = this.renderImages.bind(this);
  }

  renderImages(images){
    const {navigation, onPhotoOpen} = this.props

    return images.map((image, index) =>
      <View key={image.id}>
        <TouchableHighlight onPress={() => {
          navigation.navigate('PhotosDetail', {itemId: index})
        }}>
          <Image style={styles.photo} source={{ uri: image.url }} />
        </TouchableHighlight>
      </View>
    );
  }

  render() {
    const {images} = this.props

    return (
      <View style={styles.photosContainer}>
        <View style={styles.photosGridContainer}>
          <ScrollView style={styles.photosGridContainer}>
            <View style={styles.photosGrid}>
              {this.renderImages(images)}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    images: state.photos.images
  }
};

const mapDispatchToProps = {
  onPhotoOpen
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotosScreen);
