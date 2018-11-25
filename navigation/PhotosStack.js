import { createStackNavigator } from 'react-navigation';

import PhotosScreen from '../screens/Photos/PhotosScreen';
import PhotosDetailScreen from '../screens/Photos/PhotosDetailScreen';

export default createStackNavigator({
  Photos: PhotosScreen,
  PhotosDetail: PhotosDetailScreen
});
