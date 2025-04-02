import { useThemeChangerStore } from "../store/useThemeChangerStore";

const SettingsPage = () => {
  const { darkMode, toggleTheme } = useThemeChangerStore();

  return (
    <div className="flex flex-col h-full w-full ">
      <div className="p-5 px-20">
        <h2 className="text-3xl font-bold text-base-content">Settings</h2>
        <p className="text-info-content mt-2">Customize the settings for your need</p>
        <div className="flex mt-20 ">
          <div className="flex-1 ">
            <h2 className=" font-bold text-base-content">Preferences Information</h2>
            <p className="text-info-content text-sm mt-2">Update your appearance details here</p>

            <div className="divider my-2"></div>
            <div className="flex items-center justify-between ">
              <div className="flex flex-col gap-2  justify-between">
                <p className="text-base-content text-sm">Toggle Dark mode</p>
                <p className="text-info-content text-sm  ">Toggle dark mode on and off here</p>
              </div>
              <input type="checkbox" onChange={toggleTheme} checked={darkMode} className="toggle toggle-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
