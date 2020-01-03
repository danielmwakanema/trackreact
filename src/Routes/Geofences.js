import Add from '../views/Geofences/Add';
import Index from '../views/Geofences/Index';
import View from '../views/Geofences/View';
import Edit from '../views/Geofences/Edit';

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
    path: "/geofence/edit/:id",
    name: "Edit Geofence",
    icon: "tim-icons icon-simple-add",
    component: Edit,
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