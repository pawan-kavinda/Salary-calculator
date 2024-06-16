import React, { useState } from "react";
import EarningsInputBox from "./earnings_section/EarningsInputBox";
import DeductionInputBox from "./deductions_section/DeductionInputBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons";
import Deduction from "./deductions_section/Deduction";
import { useInputBoxContext } from "../../contexts/InputBoxContexts";

const UserInputContent = () => {
  const {
    earningsInputBoxes,
    deductionInputBoxes,
    reset,
    handleEarningsPriceChange,
    handleDeductionPriceChange,
    handleEPFCheckboxChange,
    addEarningsInputBox,
    addDeductionInputBox,
    setBasicSalary,
    basicSalary,   
    removeEarningsInputBox,
    removeDeductionInputBox,
  } = useInputBoxContext();

  const [price, setPrice] = useState(basicSalary);

  //basic salary change
  const handleBasicSalaryChange = (e) => {    
    const newPrice = parseFloat(e.target.value||0); 
    setPrice(newPrice);
    setBasicSalary(newPrice);
  };

  const handlePriceFocus = () => {
    if (basicSalary === 0) {
        setPrice('')
    }
  };

  return (
    <div className="lg:p-[32px] p-[16px] lg:w-[680px] w-[360px] lg:min-h-[616px] bg-gray-100 border border-customGray">
      <div className="mb-4">
        <div className="flex justify-between">
          <label className="block font-bold mb-5 text-[20px] font-custom">
            Calculate Your Salary
          </label>
          <div
            className="hover:text-blue-800 flex items-center text-linkColor space-x-2 cursor-pointer"
            onClick={reset}
          >
            <FontAwesomeIcon icon={faRedoAlt} />
            <button>Reset</button>
          </div>
        </div>

        <label className="block font-semibold font-custom">Basic Salary</label>

        <input
          onFocus={handlePriceFocus}
          className="block lg:h-[48px] lg:w-[356px] p-2 mt-2 border border-inputBorder"
          type="number"
          value={price}
          onChange={handleBasicSalaryChange}
          placeholder="Basic Salary"
        />
      </div>

      <div>
        <label className="block text-[16px] font-semibold mb-2 font-custom">
          Earnings
        </label>
        <label className="block text-[14px] text-fontGray font-custom">
          Allowance, Fixed, Bonus and etc
        </label>

        {earningsInputBoxes.map((box, index) => (
          <EarningsInputBox
            key={index}
            index={index}
            price={box.price}
            isEPFChecked={box.isEPFChecked}
            onPriceChange={(price) => handleEarningsPriceChange(index, price)}
            onEPFCheckboxChange={(isChecked) =>
              handleEPFCheckboxChange(index, isChecked)
            }
            onRemove={() => removeEarningsInputBox(index)}
          />
        ))}
        <button
          className="hover:text-blue-800 cursor-pointer font-custom w-[162px] mt-4 h-[40px] text-linkColor font-semibold text-[15px] flex items-center justify-center rounded-lg"
          onClick={addEarningsInputBox}
        >
          <span className="mr-2 font-custom text-[22px] ">+</span>
          Add New Allowance
        </button>
        <hr className="border-customGray my-4" />

        <Deduction />

        {deductionInputBoxes.map((box, index) => (
          <DeductionInputBox
            key={index}
            index={index}
            deductionPrice={box.deductionPrice}
            onPriceChange={(deductionPrice) =>
              handleDeductionPriceChange(index, deductionPrice)
            }
            onRemove={() => removeDeductionInputBox(index)}
          />
        ))}
        <button
          className="hover:text-blue-800 font-custom cursor-pointer w-[162px] mt-4 h-[40px] text-linkColor font-semibold text-[15px] flex items-center justify-center rounded-lg"
          onClick={addDeductionInputBox}
        >
          <span className="mr-2 text-[22px] font-custom ">+</span>
          Add New Deduction
        </button>
      </div>
    </div>
  );
};

export default UserInputContent;
