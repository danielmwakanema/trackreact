import Add from '../views/Geofences/Add';
import Index from '../views/Geofences/Index';
import View from '../views/Geofences/View';

export default [
  {
    path: "/geofence/add",
    name: "Add Geofence",
    icon: "tim-icons icon-simple-add",
    component: Add,
    layout: "/admin"
  },
  {
    path: "/geofence/view/:id",
    name: "View Geofence",
    icon: "tim-icons icon-simple-add",
    component: View,
    layout: "/admin"
  },
  {
    path: "/geofences",
    name: "Geofence List",
    icon: "tim-icons icon-bullet-list-67",
    component: Index,
    layout: "/admin"
  }
]