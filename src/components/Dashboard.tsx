import Menubar from './Menubar';
import Sidebar from './Sidebar';
import { useContext, type ReactNode } from 'react';
import { AppContext } from '../context/AppContext';

type DashboardProps = {
  children: ReactNode;
  activeMenu: string;
};

const Dashboard = ({ children, activeMenu }: DashboardProps) => {
  const app = useContext(AppContext);
  if (!app) {
    throw new Error("Dashboard must be used within AppContextProvider");
  }
  const { user } = app;
  return (
    <div>
      <Menubar activeMenu={activeMenu} />
       {user && (
         <div className="flex">
          <div className="max-[1080px]:hidden">
            <Sidebar activeMenu = {activeMenu} />
          </div>
          <div className="grow mx-5">{children}</div>
        </div>
       )}
    </div>
  )
}

export default Dashboard;