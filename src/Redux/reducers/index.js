import { combineReducers } from "redux";

import usersReducer from "./usersReducer";
import driversReducer from "./driversReducer";
import devicesReducer from "./devicesReducer";
import geofencesReducer from "./geofencesReducer";
import groupsReducer from "./groupsReducer";
import maintenancesReducer from "./maintenancesReducer";
import notificationsReducer from "./notificationsReducer";
import reportsReducer from "./reportsReducer";

export default combineReducers({
  User: usersReducer,
  Driver: driversReducer,
  Device: devicesReducer,
  Geofence: geofencesReducer,
  Group: groupsReducer,
  Maintenance: maintenancesReducer,
  Notification: notificationsReducer,
  Report: reportsReducer
});
