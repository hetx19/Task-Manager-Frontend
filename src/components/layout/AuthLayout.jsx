import React from "react";
import BG from "../../../public/bg.png";

// Image
import IMAGE from "../../assets/images/auth.png";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">Task Manager</h2>
        {children}
      </div>

      <div
        style={{ backgroundImage: "url('/bg.png')" }}
        className="hidden md:flex w-[40vw] h-screen items-center justify-center bg-blue-50 bg-cover bg-no-repeat bg-center overflow-hidden p-8"
      >
        <img src={IMAGE} className="w-64 lg:w-[90%]" alt="iamge" />
      </div>
    </div>
  );
};

export default AuthLayout;
