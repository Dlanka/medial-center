import React from "react";

type IProps = {
  children: React.ReactNode;
};

const Main = ({ children }: IProps) => {
  return (
    <div className="flex min-h-screen relative ml-[256px] mt-[56px] ">
      {/* Side bar */}
      <div className="fixed h-screen top-0 left-0 max-w-[256px] w-full bg-neutral-98 border-r border-solid border-gray-900">
        <div className="pt-[56px] h-full flex flex-col justify-between">
          <div className="">
            <ul>
              <li>
                <a href="/">Dashboard</a>
              </li>
            </ul>
          </div>

          <div className="">
            <ul>
              <li>
                <a href="/">Settings</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Top navigation */}
      <header className="border-b border-solid bg-white border-gray-900 ml-[256px] h-[56px] fixed top-0 left-0 w-full max-w-[calc(100%-256px)] ">
        <div className="px-6 h-full flex items-center justify-between">
          <h1 className="text-2xl font-bold text-neutral-20 ">App</h1>
          <div className="flex">
            <button className="mr-4">Logout</button>
            <button>Profile</button>
          </div>
        </div>
      </header>

      <div className="flex-grow bg-white">
        <main className="px-6">
          <div className="h-[1200px]">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Main;
