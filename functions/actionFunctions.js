import { Notifications } from 'expo'
import { getDistance} from 'geolib'
import { onEventActivate, onEventComplete } from '../reducers/eventReducer'
import { onLocationUpdate, onMarkerFound } from '../reducers/mapReducer'

export function getLocationActions (state, coords) {
  const {event, map} = state;

  let actions = [];
  let markersFound = [];

  if (event.events) {
    event.events.forEach((item, index) => {
      if(item.location && item.status === 'pending') {
        if (getDistance(item.location, coords.coords) < item.distance) {
          actions.push(onEventActivate(item.id));
          if (item.action.type == "MARKER_VISIBLE") {
            markersFound.push(JSON.parse(item.action.payload).id);
          }
        }
      }
    })
  }

  if (map.markers) {
    map.markers.forEach((marker, index) => {
      if(!marker.found && (marker.visible || markersFound.indexOf(marker.id) > -1)) {
        if(getDistance(marker, coords.coords) < marker.distance) {
          actions.push(onMarkerFound(marker.id));

          marker.triggers.map((trigger) => {
            actions.push(onEventActivate(trigger.id));
          });
        }
      }
    })
  }

  if (actions.length > 0) {
    let message = getNotificationMessage(actions);
    if (message) {
      Notifications.presentLocalNotificationAsync({
        title: message.title,
        body: message.body
      });
      Notifications.setBadgeNumberAsync(1);
    }
  }

  actions.push(onLocationUpdate(coords));

  return actions;
}

export function getTimerActions (state) {
  const {event} = state;

  let actions = [];

  if (event.timer && event.events) {
    event.events.forEach((item, index) => {
      if(
        item.status === 'active' &&
        (new Date()).getTime() > (item.startedOn?item.startedOn:event.timer.startedOn) + item.delay
      ) {
        actions.push(onEventComplete(item));
        actions.push(
          {
            type: item.action.type,
            payload: JSON.parse(item.action.payload)
          }
        );
      }
    })
  }

  return actions;
}

export function handleActions(store, actions) {
  actions.forEach((item) => {
    if (item.type === 'NAVIGATE') {
      NavigationService.navigate(item.payload.screen);
    } else {
      store.dispatch(item);
    }
  });

  return;
}

export function getNotificationMessage(actions) {
  actions = actions.filter(action => action.type != 'EVENT_COMPLETE' && action.type != 'EVENT_ACTIVATE');

  if (actions.length == 0) {
    return null;
  } else if (actions.length > 1) {
    return {
      title: 'New Updates',
      body: 'You have received updates, check your home screen'
    }
  } else {
    switch (actions[0].type) {
      case "MESSAGE_VISIBLE":
      case "THREAD_VISIBLE":
        return {
          title: 'New Text Message',
          body: 'You have received a new text message'
        }
      case "IMAGE_VISIBLE":
        return {
          title: 'New Image',
          body: 'You have received a new image'
        }
      case "MAIL_VISIBLE":
        return {
          title: 'New Email',
          body: 'You have received a new email'
        }
      case "REGION_VISIBLE":
        return {
          title: 'New Region',
          body: 'A new region has been discovered on your map'
        }
      case "MARKER_VISIBLE":
        return {
          title: 'New Location',
          body: 'A new location has been discovered on your map'
        }
      case "DATE_VISIBLE":
      case "DATE_ADD":
        return {
          title: 'New Event',
          body: 'A new event has been added to your calendar'
        }
    }
    return {
      title: 'New Updates',
      body: 'You have received updates, check your home screen'
    }
  }
}
