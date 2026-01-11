import { SIDE_BAR_DATA } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

type SidebarProps = {
  activeMenu: string;
};

type MenuItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
};

const Sidebar = ({ activeMenu }: SidebarProps) => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Sidebar must be used within AppContextProvider");
  }
  const { user } = context;
  const navigate = useNavigate();

  return (
    <div className="w-60 h-[calc(100vh-61px)] bg-green-950 text-white p-5 sticky top-[61px] z-20 border-r border-green-800/60">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        <h5 className="text-white font-medium leading-6 uppercase"> {user?.username || ""} </h5>
      </div>
      {(SIDE_BAR_DATA as MenuItem[]).map((item, index) => {
        const IconComponent = item.icon;
        return (
        <button 
          onClick={() => navigate(item.path)}
          key={`menu_${index}`}
          className={`cursor-pointer w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition-colors ${activeMenu === item.label ? "bg-white text-green-800" : "text-white hover:bg-green-700"}`}>
            <IconComponent className="text-xl" />
            {item.label}
          </button>
        );
      })}

    </div>
  )
}
export default Sidebar;