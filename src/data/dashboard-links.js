import { ACCOUNT_TYPE } from "../utils/constants";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/overview",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "My Task",
    path: "/dashboard/my-task",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Add Task",
    path: "/dashboard/add-task",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "Enrolled Challenges",
    path: "/dashboard/enrolled-challenges",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscMortarBoard",
  },
];
