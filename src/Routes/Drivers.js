import Add from '../views/Drivers/Add';
import Edit from '../views/Drivers/Edit';

export default [
  {
    path: "/driver/add",
    name: "Add Driver",
    icon: "tim-icons icon-simple-add",
    component: Add,
    layout: "/admin"
  },
  {
    path: "/driver/edit/:id",
    name: "Edit Driver",
    icon: "tim-icons icon-pencil",
    component: Edit,
    layout: "/admin"
  }
]