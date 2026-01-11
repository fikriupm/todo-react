import { LayoutDashboard, List, type LucideIcon } from 'lucide-react';

export const assets = {};

export const SIDE_BAR_DATA: Array<{
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
}> = [
  {
    id: "01",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "02",
    label: "To Do",
    icon: List,
    path: "/todo-items",
  },
];
