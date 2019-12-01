import Dashboard from "views/User/Dashboard.jsx";

import ReportIndex from './views/Reports/Index';
import GroupReportIndex from './views/Reports/GroupReport';
import DeviceIndex from './views/Devices/Index';
import GeofenceIndex from './views/Geofences/Index';
import GroupIndex from './views/Groups/Index';
import DriverIndex from './views/Drivers/Index';
import MaintenanceIndex from './views/Maintenances/Index';

import DeviceLinks from './Routes/Devices';
import GeofenceLinks from './Routes/Geofences';
import GroupLinks from './Routes/Groups';
import DriverLinks from './Routes/Drivers';
import MaintenanceLinks from './Routes/Maintenances';

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
    icon: "tim-icons icon-app",
    layout: "/admin",
    path: '/devices',
    component: DeviceIndex,
    children: DeviceLinks
  },
  {
    name: "Drivers",
    icon: "tim-icons icon-delivery-fast",
    layout: "/admin",
    path: '/drivers',
    component: DriverIndex,
    children: DriverLinks
  },
  {
    name: "Geofences",
    icon: "tim-icons icon-bus-front-12",
    layout: "/admin",
    path: '/geofences',
    component: GeofenceIndex,
    children: GeofenceLinks
  },
  {
    name: "Groups",
    icon: "tim-icons icon-paper",
    layout: "/admin",
    path: '/groups',
    component: GroupIndex,
    children: GroupLinks
  },
  {
    name: "Maintenances",
    icon: "tim-icons icon-settings-gear-63",
    layout: "/admin",
    path: '/maintenances',
    component: MaintenanceIndex,
    children: MaintenanceLinks
  },
  {
    name: "Device Reports",
    icon: "tim-icons icon-book-bookmark",
    layout: "/admin",
    path: '/reports/device',
    component: ReportIndex
  },
  {
    name: "Group Reports",
    icon: "tim-icons icon-book-bookmark",
    layout: "/admin",
    path: '/reports/group',
    component: GroupReportIndex
  }
];

export default routes;
