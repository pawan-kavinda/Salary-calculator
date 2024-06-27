import React, { useState,useEffect } from 'react';
import { useInputBoxContext } from "../../../contexts/InputBoxContexts";

const DeductionInputBox = ({ index }) => {
  const {deductionInputBoxes, handleDeductionPriceChange,handleDeductionDescriptionBoxChange, removeDeductionInputBox } = useInputBoxContext();
  const [price, setPrice] = useState(deductionInputBoxes[index].deductionPrice);   
  const [description, setDescription] = useState(deductionInputBoxes[index].description);

  useEffect(() => {
    setPrice(deductionInputBoxes[index].price);  
    setDescription(deductionInputBoxes[index].description);
  }, [deductionInputBoxes, index]);

  //handling the value changes of Deduction input fields
  const handleChange = (e) => {
    const newPrice = parseFloat(e.target.value); 
    setPrice(newPrice);
    handleDeductionPriceChange(index, newPrice);
  };

  //for the close button event
  const handleRemoveInputBox = () => {
    removeDeductionInputBox(index);
  };

  const handleDescriptionBox=(e)=>{
    const description = e.target.value;
    handleDeductionDescriptionBoxChange(index,description)
  }

  const handlePriceFocus = () => {
    if (price === 0) {
        setPrice('')
    }
  };

  return (
    <div className="flex mt-6">
      <input
        onChange={ handleDescriptionBox}
        className="lg:h-[48px] lg:w-[212px] lg:mr-3 h-[30px] w-[100px] mr-3 p-2"
        value={description}
        placeholder="Pay Details (Title)"        
      />
      <input
        onFocus={handlePriceFocus}
        className="lg:h-[48px] rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 p-2 text-right lg:w-[136px] h-[30px] w-[100px] mr-3 "
        onChange={handleChange}
        placeholder="Amount"
        value={price}
        type="number"
      />
      <div onClick={handleRemoveInputBox} className="lg:w-[32px] lg:h-[32px] w-[16px] h-[16px] my-2 rounded-full bg-gray-300 flex justify-center items-center cursor-pointer hover:bg-red-400">
        <span className="text-black font-bold text-m lg:text-xl p-2">✕</span>
      </div>
    </div>
  );
};

export default DeductionInputBox;





























