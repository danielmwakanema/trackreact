import Add from '../views/Devices/Add';
import View from '../views/Devices/View';
import Index from '../views/Devices/Index';
import Edit from '../views/Devices/Edit';
import AddToGroup from '../views/Devices/AddToGroup';
import AddToGeofence from '../views/Devices/AddToGeofence';

export default [
  {
    path: "/device/add",
    name: "Add Device",
    icon: "tim-icons icon-simple-add",
    component: Add,
    layout: "/admin"
  },
  {
    path: "/device/addToGroup/:id",
    name: "Add Device To Group",
    icon: "tim-icons icon-simple-add",
    component: AddToGroup,
    layout: "/admin"
  },
  {
    path: "/device/addToGeofence/:id",
    name: "Add Device To Geofence",
    icon: "tim-icons icon-simple-add",
    component: AddToGeofence,
    layout: "/admin"
  },
  {
    path: "/device/edit/:id",
    name: "Edit Device",
    icon: "tim-icons icon-pencil",
    component: Edit,
    layout: "/admin"
  },
  {
    path: "/device/view/:id",
    name: "View Device",
    icon: "tim-icons icon-video-66",
    component: View,
    layout: "/admin"
  },
  {
    path: "/devices",
    name: "Device List",
    icon: "tim-icons icon-bullet-list-67",
    component: Index,
    layout: "/admin"
  }
]