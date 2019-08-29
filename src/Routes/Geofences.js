import Add from '../views/Geofences/Add';
import Index from '../views/Geofences/Index';

export default [
  {
    path: "/geofence/add",
    name: "Add Geofence",
    icon: "tim-icons icon-simple-add",
    component: Add,
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