import React from "react";
import MenuItem from "./components/MenuItem";
import IconButton from "../Core/UI/IconButton";

type IProps = {
  children: React.ReactNode;
};

const Main = ({ children }: IProps) => {
  return (
    <div className="flex flex-col min-h-screen relative  bg-primary-90">
      {/* Top bar */}
      <div className="px-6 grid grid-cols-3 items-center">
        {/* Start */}
        <div className="">MediCare</div>

        {/* center */}
        <div className="flex h-full py-2  justify-center items-center">
          <div className="flex justify-center">
            <div className="rounded-lg p-2 bg-white gap-4 flex shadow-sm">
              <MenuItem to="/" iconName="menu-dashboard" />
              <MenuItem to="/patients" iconName="menu-patient" />
              <MenuItem to="/patients" iconName="settings" />
            </div>
          </div>
        </div>

        {/* End */}
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-3">
            <IconButton iconName="add" />
            <IconButton iconName="notifications" />
            <IconButton iconName="settings" />
          </div>
        </div>
      </div>

      <div className="px-6 py-4 pt-0 flex-1 grid">
        <div className="rounded-2xl bg-white w-full h-full">{children}</div>
      </div>
    </div>
  );
};

export default Main;
