import Add from '../views/User/Add';
import Edit from '../views/User/Edit';

export default [
  {
    path: "/user/add",
    name: "Add User",
    icon: "tim-icons icon-simple-add",
    component: Add,
    layout: "/admin"
  },
  {
    path: "/user/edit/:id",
    name: "Edit User",
    icon: "tim-icons icon-pencil",
    component: Edit,
    layout: "/admin"
  }
]