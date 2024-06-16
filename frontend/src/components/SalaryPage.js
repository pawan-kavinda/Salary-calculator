import React from "react";
import OutputSide from "./output_side/OutputSide";
import UserInputSide from "./input_side/UserInputSide";
import { InputBoxProvider } from "../contexts/InputBoxContexts";

const SalaryPage = () => {
  return (
    <InputBoxProvider>
      <div className="flex justify-center items-center lg:py-[100px] p-[60px] lg:px-[142px] bg-white gap-0">
        <div className="flex flex-col lg:flex-row gap-10 justify-center items-center lg:items-start">
          <div className="transform transition-transform duration-300 hover:scale-105 hover:bg-gray-200 hover:shadow-lg rounded-lg p-4">
            <UserInputSide />
          </div>
          <div className="transform transition-transform duration-300 hover:scale-105 hover:bg-gray-200 hover:shadow-lg rounded-lg p-4">
            <OutputSide />
          </div>
        </div>
      </div>
    </InputBoxProvider>
  );
};

export default SalaryPage;
