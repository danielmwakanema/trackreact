import Dashboard from "views/User/Dashboard.jsx";
import DeviceLinks from './Routes/Devices';
import GeofenceLinks from './Routes/Geofences';
import DriverLinks from './Routes/Drivers';
import GroupLinks from './Routes/Groups';
import MaintenceLinks from './Routes/Maintenances';

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    name: "Devices",
    icon: "tim-icons icon-bus-front-12",
    layout: "/admin",
    children: DeviceLinks
  },
  {
    name: "Geofences",
    icon: "tim-icons icon-app",
    layout: "/admin",
    children: GeofenceLinks
  },
  {
    name: "Drivers",
    icon: "tim-icons icon-delivery-fast",
    layout: "/admin",
    children: DriverLinks
  },
  {
    name: "Groups",
    icon: "tim-icons icon-paper",
    layout: "/admin",
    children: GroupLinks
  },
  {
    name: "Maintenance",
    icon: "tim-icons icon-settings-gear-63",
    layout: "/admin",
    children: MaintenceLinks
  }
];

export default routes;
