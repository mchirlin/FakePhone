import { StyleSheet } from 'react-native';

import colors from './colors'

const fontFamily = 'balsamiq-sans-regular'
const fontFamilyBold = 'balsamiq-sans-bold'

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'stretch'
  },
  darkContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  darkBackground: {
    backgroundColor: colors.darkBackground
  },
  lightBackground: {
    backgroundColor: colors.lightBackground
  },
  lightContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightBackground
  },
  contentContainer: {
    flex: 1,
    paddingTop: 35,
  },
  listSeparator: {
    width: '100%',
    height: 1,
    backgroundColor: '#CED0CE',
  },
  rowLayout: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rowLayoutBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  columnLayout: {
    flexDirection: 'column'
  },
  buttonLayout: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    borderWidth: 2,
    borderColor: '#000',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 8,
  },
  buttonCall: {
    backgroundColor: '#4cd964',
  },
  buttonEnd: {
    backgroundColor: '#ff0800',
  },
  buttonBack: {
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 3,
    margin: 10,
  },
  phoneNumberContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 80
  },
  buttonLeftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  buttonRightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mailItem: {
    backgroundColor: colors.lightBackground,
    flex: 1,
    padding: 10
  },
  mailItemHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  mailDetailContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: colors.lightBackground,
  },
  mailDetailBackground: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  mailBody: {
    marginTop: 10
  },
  textXlarge: {
    fontSize: 40,
    fontFamily: fontFamily
  },
  textXlargeBold: {
    fontSize: 40,
    fontFamily: fontFamilyBold
  },
  textLarge: {
    fontSize: 20,
    fontFamily: fontFamily
  },
  textLargeBold: {
    fontSize: 20,
    fontFamily: fontFamilyBold
  },
  textMedium: {
    fontSize: 15,
    fontFamily: fontFamily
  },
  textMediumBold: {
    fontSize: 15,
    fontFamily: fontFamilyBold
  },
  textSmall: {
    fontSize: 13,
    fontFamily: fontFamily
  },
  textSmallBold: {
    fontSize: 13,
    fontFamily: fontFamilyBold
  },
  textWhite: {
    color: '#fff'
  },
  textBlue: {
    color: '#00f'
  },
  textGreen: {
    color: 'green'
  },
  textBlack: {
    color: '#000'
  },
  avatar: {
    marginRight: 20
  },
  tabBar: {
    borderTopWidth: 2,
    borderColor: '#000',
    width: '100%',
    height: 100,
    backgroundColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  appButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  homeIcon: {
    marginLeft: 10
  }
})

export const messageStyles = {
  left: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
    },
    wrapper: {
      borderRadius: 15,
      backgroundColor: '#ccc',
      marginRight: 60,
      minHeight: 20,
      padding: 4,
      justifyContent: 'flex-end',
    },
    text: {
      color: '#000'
    },
    containerToNext: {
      borderBottomLeftRadius: 3,
    },
    containerToPrevious: {
      borderTopLeftRadius: 3,
    },
  }),
  right: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-end',
    },
    wrapper: {
      borderRadius: 15,
      backgroundColor: '#b771cf',
      marginLeft: 60,
      minHeight: 20,
      padding: 4,
      justifyContent: 'flex-end',
    },
    text: {
      color: '#fff'
    },
    containerToNext: {
      borderBottomRightRadius: 3,
    },
    containerToPrevious: {
      borderTopRightRadius: 3,
    },
  }),
}

export const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": colors.lightBackground
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#fff"
      }
    ]
  }
]

export default styles
