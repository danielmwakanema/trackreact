import Add from '../views/Drivers/Add';
import Index from '../views/Drivers/Index';
import View from '../views/Drivers/View';

export default [
  {
    path: "/driver/add",
    name: "Add Driver",
    icon: "tim-icons icon-simple-add",
    component: Add,
    layout: "/admin"
  },
  {
    path: "/driver/view/:id",
    name: "View Driver",
    icon: "tim-icons icon-simple-add",
    component: View,
    layout: "/admin"
  },
  {
    path: "/drivers",
    name: "Driver List",
    icon: "tim-icons icon-bullet-list-67",
    component: Index,
    layout: "/admin"
  }
]