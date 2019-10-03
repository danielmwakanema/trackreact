import Add from '../views/Maintenances/Add';
import Index from '../views/Maintenances/Index';
import View from '../views/Maintenances/View';

export default [
  {
    path: "/maintenance/add",
    name: "Add Maintenance",
    icon: "tim-icons icon-simple-add",
    component: Add,
    layout: "/admin"
  },
  {
    path: "/maintenance/view/:id",
    name: "View Maintenance",
    icon: "tim-icons icon-simple-add",
    component: View,
    layout: "/admin"
  },
  {
    path: "/maintenances",
    name: "Maintenance List",
    icon: "tim-icons icon-bullet-list-67",
    component: Index,
    layout: "/admin"
  }
]