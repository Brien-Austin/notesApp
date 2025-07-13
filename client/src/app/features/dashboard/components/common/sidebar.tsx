"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSidebarContext } from "../../contexts/sidebarContext";
import { useDashboardRoutes } from "../../hooks/dashboardRoutes";

const Sidebar = () => {
  const router = useRouter();
  const { isExpanded, setIsExpanded } = useSidebarContext();

  const routes = useDashboardRoutes();

  return (
    //drop-shadow-[rgba(0,0,0,0.01)] from-[#fdfdff] to-[#eeeeee]
    <motion.div
      initial={{ width: 50 }}
      whileHover={{ width: 180 }}
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
      className="h-screen bg-gradient-to-br py-6 bg-[#f8f9fa]
overflow-hidden border-r-[1px] border-[#D9D9D9] shadow-lg"
    >
      {routes.map((route) => {
        const isActive = route.isActive;

        return (
          <div
            key={route.route}
            className={`flex items-center cursor-pointer p-3 transition-colors duration-150 ${
              isActive
                ? "bg-sky-600 text-white"
                : "hover:bg-gray-100 text-gray-700"
            }`}
            onClick={() => router.push(route.route)}
          >
            <route.icon
              className={`w-5 h-5 flex-shrink-0 ${
                isActive ? "text-white" : "text-[#5F5F5FFF]"
              }`}
            />
            {isExpanded && (
              <span className={`ml-2 text-sm`}>{route.routeName}</span>
            )}
          </div>
        );
      })}
    </motion.div>
  );
};

export default Sidebar;
