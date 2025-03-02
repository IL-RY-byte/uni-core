import { useContext, useEffect, useState } from "react";
import { IconSettingsFilled } from "@tabler/icons-react";
import { SessionContext } from "@/context/SessionContext";

const Header = () => {
  const { user, loading } = useContext(SessionContext);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second.
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-between w-full px-4 py-2 border-b border-gray-300">
      {/* Left Side: User Info */}
      <div className="flex items-center gap-3">
        {/* Profile Icon */}
        <div className="w-6 h-6 bg-black rounded-full"></div>
        <div>
          <p className="text-sm font-semibold text-gray-900">
            {loading
              ? "Loading..."
              : user
              ? `${user.name} ${user.surname}`
              : "Guest"}
          </p>
          <p className="text-xs text-gray-600">
            {loading ? "" : user && user.roles.length > 0 ? user.roles[0] : ""}
          </p>
        </div>
      </div>

      {/* Right Side: Timestamp and Settings Icon */}
      <div className="flex items-center gap-3 text-gray-700">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">
            {currentTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="text-xs text-gray-500">
            {currentTime.toLocaleDateString()}
          </p>
        </div>
        {/* Divider and Settings Icon */}
        <div className="border-l border-gray-400 h-5"></div>
        <IconSettingsFilled className="w-5 h-5 text-gray-800 cursor-pointer hover:text-gray-900" />
      </div>
    </div>
  );
};

export default Header;
