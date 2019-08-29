import Add from '../views/Drivers/Add';
import Index from '../views/Drivers/Index';

export default [
  {
    path: "/driver/add",
    name: "Add Driver",
    icon: "tim-icons icon-simple-add",
    component: Add,
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