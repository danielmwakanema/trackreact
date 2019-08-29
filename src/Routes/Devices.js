import Add from '../views/Devices/Add';
import Index from '../views/Devices/Index';

export default [
  {
    path: "/device/add",
    name: "Add Device",
    icon: "tim-icons icon-simple-add",
    component: Add,
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