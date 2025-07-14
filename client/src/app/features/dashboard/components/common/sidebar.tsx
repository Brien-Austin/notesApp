"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSidebarContext } from "../../contexts/sidebarContext";
import { useDashboardRoutes } from "../../hooks/dashboardRoutes";
import CreateNoteModal from "../notes/components/createNodeModal";
import CreateBookmarkModal from "../bookmark/components/createBookMarkModal";

const Sidebar = () => {
  const router = useRouter();
  const { isExpanded, setIsExpanded } = useSidebarContext();
  const [isMobile, setIsMobile] = useState(false);
  const [activeModalType, setActiveModalType] = useState<
    "note" | "bookmark" | null
  >(null);
  const routes = useDashboardRoutes();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleRouteClick = (route: string) => {
    router.push(route);
  };

  const currentRoute = routes.find((route) => route.isActive);

  if (isMobile) {
    const showCenterButton =
      currentRoute &&
      (currentRoute.route.includes("/notes") ||
        currentRoute.route.includes("/bookmarks"));

    return (
      <>
        {activeModalType === "note" && (
          <CreateNoteModal
            isOpen={true}
            onClose={() => setActiveModalType(null)}
          />
        )}
        {activeModalType === "bookmark" && (
          <CreateBookmarkModal
            isOpen={true}
            onClose={() => setActiveModalType(null)}
          />
        )}

        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg md:hidden">
          <div className="flex justify-around items-center py-2 px-1 max-w-md mx-auto relative">
            {routes.slice(0, 5).map((route) => {
              const isActive = route.isActive;
              return (
                <button
                  key={route.route}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-0 flex-1 ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                  }`}
                  onClick={() => handleRouteClick(route.route)}
                >
                  <route.icon
                    className={`w-5 h-5 mb-1 ${
                      isActive ? "text-indigo-600" : "text-gray-600"
                    }`}
                  />

                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-indigo-600 rounded-full"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}

            {showCenterButton && (
              <div className="absolute left-1/2 transform -translate-x-1/2 -top-6">
                <button
                  className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 bg-indigo-600 text-white hover:bg-indigo-700 border-4 border-white"
                  onClick={() => {
                    if (currentRoute?.route.includes("notes")) {
                      setActiveModalType("note");
                    } else if (currentRoute?.route.includes("bookmarks")) {
                      setActiveModalType("bookmark");
                    }
                  }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <motion.div
      initial={{ width: 50 }}
      whileHover={{ width: 180 }}
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
      className="h-screen bg-gradient-to-br py-6 bg-[#f8f9fa] overflow-hidden border-r-[1px] border-[#D9D9D9] shadow-lg hidden md:block"
    >
      {routes.map((route) => {
        const isActive = route.isActive;
        return (
          <div
            key={route.route}
            className={`flex items-center cursor-pointer p-3 transition-colors duration-150 ${
              isActive
                ? "bg-indigo-600 text-white"
                : "hover:bg-gray-100 text-gray-700"
            }`}
            onClick={() => handleRouteClick(route.route)}
          >
            <route.icon
              className={`w-5 h-5 flex-shrink-0 ${
                isActive ? "text-white" : "text-[#5F5F5FFF]"
              }`}
            />
            {isExpanded && (
              <span className="ml-2 text-sm">{route.routeName}</span>
            )}
          </div>
        );
      })}
    </motion.div>
  );
};

export default Sidebar;
