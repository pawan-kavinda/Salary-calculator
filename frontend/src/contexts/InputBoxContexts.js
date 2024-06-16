import React, { createContext, useContext, useState, useEffect } from "react";

const InputBoxContext = createContext();

export const InputBoxProvider = ({ children }) => {

  //usestate
  const [earningsInputBoxes, setEarningsInputBoxes] = useState(() => {
    const savedEarnings = localStorage.getItem('earningsInputBoxes');
    return savedEarnings ? JSON.parse(savedEarnings) : [{ description: '', price: 0, isEPFChecked: false }];
  });

  const [deductionInputBoxes, setDeductionInputBoxes] = useState(() => {
    const savedDeductions = localStorage.getItem('deductionInputBoxes');
    return savedDeductions ? JSON.parse(savedDeductions) : [{description: '', deductionPrice: 0 }];
  });

  const [basicSalary, setBasicSalary] = useState(localStorage.getItem('basicSalary') || 0);
  const [totalEarningsForEPF, setTotalEarningsForEPF] = useState(0);
  const [APIT, setAPIT] = useState(0);

  //calculation variables
  const totalDeduction = deductionInputBoxes.reduce((acc, cur) => acc + cur.deductionPrice, 0);
  const grossEarnings = earningsInputBoxes.reduce((acc, cur) => acc + parseFloat(cur.price || 0), 0) + parseFloat(basicSalary || 0) - totalDeduction;
  const totalEarnings = earningsInputBoxes.reduce((acc, cur) => acc + parseFloat(cur.price || 0), 0) + parseFloat(basicSalary || 0);
  const employeeEPF12 = ((totalEarningsForEPF - totalDeduction) * 0.12);
  const employeeEPF3 = ((totalEarningsForEPF - totalDeduction) * 0.03);
  const employeeEPF = (totalEarningsForEPF - totalDeduction) * 0.08;
  const costToCompany = (grossEarnings + employeeEPF12 + employeeEPF3);

  //APIT render
  useEffect(() => {
    setAPIT(calculateAPIT(grossEarnings));
  }, [grossEarnings]);

  //basic salarychange and earning input price handling
  useEffect(() => {
    setTotalEarningsForEPF(parseFloat(basicSalary || 0) + earningsInputBoxes.reduce((acc, cur) => acc + (cur.isEPFChecked ? parseFloat(cur.price || 0) : 0), 0));
  }, [basicSalary, earningsInputBoxes]);

  //store inputs in local storage
  useEffect(() => {
    localStorage.setItem("basicSalary", basicSalary);
    localStorage.setItem("earningsInputBoxes", JSON.stringify(earningsInputBoxes));
    localStorage.setItem("deductionInputBoxes", JSON.stringify(deductionInputBoxes));
  }, [basicSalary, earningsInputBoxes, deductionInputBoxes]);

  
  const calculateAPIT = (grossEarnings) => {
    if (grossEarnings <= 100000) {
      return 0;
    } else if (grossEarnings > 100000 && grossEarnings <= 141667) {
      return (grossEarnings * 0.06 - 6000);
    } else if (grossEarnings > 141667 && grossEarnings <= 183333) {
      return (grossEarnings * 0.12 - 14500);
    } else if (grossEarnings > 183333 && grossEarnings <= 225000) {
      return (grossEarnings * 0.18 - 25500);
    } else if (grossEarnings > 225000 && grossEarnings <= 266667) {
      return (grossEarnings * 0.24 - 39000);
    } else if (grossEarnings > 266667 && grossEarnings <= 308333) {
      return (grossEarnings * 0.3 - 55000);
    } else if (grossEarnings > 308333) {
      return (grossEarnings * 0.36 - 73500);
    }
  };

  //reset page function
  const reset=()=>{
    localStorage.clear()
    window.location.reload()
  }

//for hadle the input value changes of earning section
  const handleEarningsPriceChange = (index, price) => {
    const updatedInputBoxes = [...earningsInputBoxes];
    const previousPrice = parseFloat(updatedInputBoxes[index].price || 0);
    const isEPFChecked = updatedInputBoxes[index].isEPFChecked;

    updatedInputBoxes[index].price = price;
    setEarningsInputBoxes(updatedInputBoxes);

    if (isEPFChecked) {
      setTotalEarningsForEPF(totalEarningsForEPF - previousPrice + parseFloat(price || 0));
    }
  };
//for handle the checkbox value changing in earning section
  const handleEPFCheckboxChange = (index, isChecked) => {
    const updatedInputBoxes = [...earningsInputBoxes];
    const price = parseFloat(updatedInputBoxes[index].price || 0);
    updatedInputBoxes[index].isEPFChecked = isChecked;
    setEarningsInputBoxes(updatedInputBoxes);

    if (isChecked) {
      setTotalEarningsForEPF(totalEarningsForEPF + price);
    } else {
      setTotalEarningsForEPF(totalEarningsForEPF - price);
    }
  };

  //handle title of inputbox in earning section
  const handleEarningDescriptionBoxChange = (index, value) => {
    const updated = [...earningsInputBoxes];
    updated[index].description = value;
    setEarningsInputBoxes(updated);
  };

//for handle the input value changes of deduction section
  const handleDeductionPriceChange = (index, deductionPrice) => {
    const updatedDeductionBoxes = [...deductionInputBoxes];
    updatedDeductionBoxes[index].deductionPrice = deductionPrice || 0;
    setDeductionInputBoxes(updatedDeductionBoxes);
  };

  
  const handleDeductionDescriptionBoxChange=(index,value)=>{
    const updated = [...deductionInputBoxes];
    updated[index].description = value;
    setDeductionInputBoxes(updated);
  }

  //adding input boxes layout to earning section
  const addEarningsInputBox = () => {
    setEarningsInputBoxes([...earningsInputBoxes, { description: '', price: 0, isEPFChecked: false }]);
  };

   //adding inputboxes to Decuction section
  const addDeductionInputBox = () => {
    setDeductionInputBoxes([...deductionInputBoxes, { deductionPrice: 0 }]);
  };

  //remove input boxes of earning section for close button
  const removeEarningsInputBox = (indexToRemove) => {
    setEarningsInputBoxes(prevBoxes => prevBoxes.filter((_, index) => index !== indexToRemove));
  };

  //remove input boxes of earning section for close button
  const removeDeductionInputBox = (indexToRemove) => {
    setDeductionInputBoxes(prevBoxes => prevBoxes.filter((_, index) => index !== indexToRemove));
  };

  return (
    <InputBoxContext.Provider
      value={{
        earningsInputBoxes,setDeductionInputBoxes, deductionInputBoxes, totalEarningsForEPF,
        handleEarningsPriceChange, handleDeductionPriceChange, handleEPFCheckboxChange, addEarningsInputBox, addDeductionInputBox,
        reset,setBasicSalary, basicSalary, setTotalEarningsForEPF, grossEarnings, totalDeduction, removeEarningsInputBox, removeDeductionInputBox,
        employeeEPF,costToCompany,handleDeductionDescriptionBoxChange, employeeEPF12, employeeEPF3, APIT, totalEarnings, handleEarningDescriptionBoxChange
      }}
    >
      {children}
    </InputBoxContext.Provider>
  );
};

export const useInputBoxContext = () => useContext(InputBoxContext);
