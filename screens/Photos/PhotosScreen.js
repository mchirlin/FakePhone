import React from 'react';
import { View, ScrollView, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux'
import { Image } from 'react-native-expo-image-cache';

import HomeButton from '../../components/Common/HomeButton'
import { onImagesOpen } from '../../reducers/photosReducer'
import styles from '../../constants/styles'

class PhotosScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Photos',
      headerLeft: (
        <HomeButton navigation={navigation} />
      ),
      headerTitleStyle: styles.textLarge
    }
  }

  constructor() {
    super()

    this.renderImages = this.renderImages.bind(this);
  }

  componentDidMount() {
    const {onImagesOpen} = this.props;

    onImagesOpen();
  }

  renderImages(images){
    const {navigation} = this.props

    return images.filter(image => image.visible).map((image, index) =>
      <View key={image.id}>
        <TouchableHighlight onPress={() => {
          navigation.navigate('PhotosDetail', {itemId: index})
        }}>
          <Image style={styles.photo} uri={image.url} />
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
  onImagesOpen,

}

export default connect(mapStateToProps, mapDispatchToProps)(PhotosScreen);
