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
    justifyContent: 'space-between',
  },
  gridLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
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
  badge: {
    backgroundColor: colors.red,
    position: 'absolute',
    bottom: 70,
    left: -5
  },

  /* PHONE */
  button: {
    backgroundColor: '#ccc',
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
    backgroundColor: colors.callGreen,
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
    backgroundColor: '#ccc',
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

  /* MAIL */
  mailHeader: {
    backgroundColor: colors.red
  },
  mailItem: {
    backgroundColor: '#fff',
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

  /* MESSAGES */
  messagesHeader: {
    backgroundColor: colors.green
  },
  messagesList: {
    marginTop: 20
  },

  /* PHOTOS */
  photosHeader: {
    backgroundColor: 'purple'
  },
  photosContainer: {
    flex: 1,                            // Take up all available space
    justifyContent: 'center',           // Center vertically
    alignItems: 'center',               // Center horizontally
    backgroundColor: '#333',            // Darker background for content area
  },
  photosGridContainer:{
    flex: 1
  },
  photosGrid:{
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  photo:{
    width: 115,
    height: 150,
    margin:5
  },

  /* CALENDAR */
  calendarHeader: {
    backgroundColor: colors.blue,
  },

  /* SETTINGS */
  settingsHeader: {
    padding: 10,
  },
  settingsItem: {
    backgroundColor: "white",
    flex: 1,
    padding: 10
  },

  /* BANK */
  bankHeader: {
    backgroundColor: colors.tomato
  },

  /* TEXT */
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
    backgroundColor: '#444',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  appButton: {
    backgroundColor: '#ccc',
    // borderWidth: 2,
    // borderColor: '#000',
    width: 70,
    height: 70,
    borderRadius: 20,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  appSpace: {
    width: 70,
    height: 70,
    borderRadius: 20,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  homeIcon: {
    paddingLeft: 10,
    paddingRight: 20
  },
  buttonDestruction: {
    backgroundColor: colors.red
  }
})

export const calendarTheme = {
  backgroundColor: '#ffffff',
  calendarBackground: '#ffffff',
  textSectionTitleColor: '#b6c1cd',
  selectedDayBackgroundColor: '#00adf5',
  selectedDayTextColor: '#ffffff',
  todayTextColor: '#00adf5',
  dayTextColor: '#2d4150',
  textDisabledColor: '#d9e1e8',
  dotColor: '#00adf5',
  selectedDotColor: '#ffffff',
  arrowColor: 'orange',
  monthTextColor: 'blue',
  textDayFontFamily: fontFamily,
  textMonthFontFamily: fontFamily,
  textDayHeaderFontFamily: fontFamily,
  textMonthFontWeight: 'bold',
  textDayFontSize: 16,
  textMonthFontSize: 16,
  textDayHeaderFontSize: 16
}

export const messageStyles = {
  left: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
      marginLeft: 20,
      marginTop: 2
    },
    wrapper: {
      borderRadius: 15,
      backgroundColor: '#ccc',
      marginRight: 60,
      minHeight: 20,
      padding: 10,
      justifyContent: 'flex-end',
    },
    text: {
      color: '#000',
      fontSize: 15,
      fontFamily: fontFamily
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
      marginRight: 20,
      marginTop: 2
    },
    wrapper: {
      borderRadius: 15,
      backgroundColor: '#b771cf',
      marginLeft: 60,
      minHeight: 20,
      padding: 10,
      justifyContent: 'flex-end',
    },
    text: {
      color: '#fff',
      fontSize: 15,
      fontFamily: fontFamily
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
        "color": colors.blue
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
