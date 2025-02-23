import { IconSettingsFilled } from "@tabler/icons-react";

const Header = () => {
  return (
    <div className="flex items-center justify-between w-full px-4 py-2 border-b border-gray-300">
      {/* Left Side: User Info */}
      <div className="flex items-center gap-3">
        {/* Profile Icon */}
        <div className="w-6 h-6 bg-black rounded-full"></div>
        <div>
          <p className="text-sm font-semibold text-gray-900">Elizaveta</p>
          <p className="text-xs text-gray-600">Admin</p>
        </div>
      </div>

      {/* Right Side: Timestamp and Settings Icon */}
      <div className="flex items-center gap-3 text-gray-700">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">12:29 PM</p>
          <p className="text-xs text-gray-500">Jan 31, 2025</p>
        </div>
        {/* Divider and Settings Icon */}
        <div className="border-l border-gray-400 h-5"></div>
        <IconSettingsFilled className="w-5 h-5 text-gray-800 cursor-pointer hover:text-gray-900" />
      </div>
    </div>
  );
};

export default Header;
