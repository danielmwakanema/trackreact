import Add from '../views/Groups/Add';
import Index from '../views/Groups/Index';
import View from '../views/Groups/View';

export default [
  {
    path: "/group/add",
    name: "Add Group",
    icon: "tim-icons icon-simple-add",
    component: Add,
    layout: "/admin"
  },
  {
    path: "/group/view/:id",
    name: "View Group",
    icon: "tim-icons icon-simple-add",
    component: View,
    layout: "/admin"
  },
  {
    path: "/groups",
    name: "Group List",
    icon: "tim-icons icon-bullet-list-67",
    component: Index,
    layout: "/admin"
  }
]