import React, { useState, useEffect } from 'react';
import { useInputBoxContext } from '../../../contexts/InputBoxContexts';

const EarningsInputBox = ({ index }) => {
  const { earningsInputBoxes, handleEarningsPriceChange, handleEPFCheckboxChange, handleEarningDescriptionBoxChange, removeEarningsInputBox } = useInputBoxContext();
  
  // Local state for each input box
  const [price, setPrice] = useState(earningsInputBoxes[index].price);
  const [isEPFChecked, setIsEPFChecked] = useState(earningsInputBoxes[index].isEPFChecked);
  const [description, setDescription] = useState(earningsInputBoxes[index].description);

  // Update local state when props change
  useEffect(() => {
    setPrice(earningsInputBoxes[index].price);
    setIsEPFChecked(earningsInputBoxes[index].isEPFChecked);
    setDescription(earningsInputBoxes[index].description);
  }, [earningsInputBoxes, index]);

  // Handle price change
  const handlePriceChange = (e) => {
    const newPrice = parseFloat(e.target.value);
    setPrice(newPrice);
    handleEarningsPriceChange(index, newPrice);
  };

  // Handle checkbox change
  const handleCheckboxChange = () => {
    const newIsEPFChecked = !isEPFChecked;
    setIsEPFChecked(newIsEPFChecked);
    handleEPFCheckboxChange(index, newIsEPFChecked);
  };

  // Handle description change
  const handleDescriptionBox = (e) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
    handleEarningDescriptionBoxChange(index, newDescription);
  };

  // Handle input focus
  const handlePriceFocus = () => {
    if (price === 0) {
      setPrice('');
    }
  };

  // Remove input box
  const handleRemoveInputBox = () => {
    removeEarningsInputBox(index);
  };

  return (
    <div className="flex mt-3">
      <input
        value={description}
        onChange={handleDescriptionBox}
        className="lg:h-[48px] lg:w-[212px] lg:mr-3 h-[30px] w-[100px] mr-3 border border-inputBorder p-2"
        placeholder="Pay Details (Title)"
        type='text'
      />
      <input
        onFocus={handlePriceFocus}
        className="lg:h-[48px] text-right lg:w-[136px] lg:mr-3 h-[30px] w-[100px] mr-3 border p-2 border-inputBorder"
        onChange={handlePriceChange}
        placeholder="Amount"
        type="number"
        value={price}
      />
      <div className="lg:w-[32px] lg:h-[32px] w-[16px] h-[16px] my-2 rounded-full bg-gray-300 flex justify-center items-center cursor-pointer hover:bg-red-400" onClick={handleRemoveInputBox}>
        <span className="text-black font-bold text-m lg:text-xl p-2">✕</span>
      </div>
      <label className="inline-flex items-center space-x-2 ml-4 lg:ml-4">
        <input
          type="checkbox"
          className="form-checkbox h-[16px] w-[16px] lg:h-[24px] lg:w-[24px] text-indigo-600"
          checked={isEPFChecked}
          onChange={handleCheckboxChange}
        />
        <span className="text-sm lg:text-m font-semibold">EPF/ETF</span>
      </label>
    </div>
  );
};

export default EarningsInputBox;
