
import React from "react";
import { useInputBoxContext } from "../../contexts/InputBoxContexts";


const OutputSide = () => {
  const { basicSalary , APIT,totalDeduction,employeeEPF,costToCompany,employeeEPF12,employeeEPF3,totalEarnings} = useInputBoxContext();


  //number format into 2 decimals and dividing into thousends
  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    }).format(number);
  };

  return (
    <div className="lg:w-[480px] p-[32px] w-[360px] h-[616px] border border-customGray font-custom">
      <label className="font-bold">Your Salary</label>
      <div className="mt-4 flex justify-between">
        <label className="text-fontGray font-bold text-[14px]">Items</label>
        <label className="text-fontGray font-bold text-[14px]">Amount</label>
      </div>
      <div className="mt-4 flex text-[16px] justify-between">
        <label >Basic Salary</label>
        <label >{formatNumber(basicSalary)}</label>
      </div>
      <div className="mt-4 text-[16px] flex justify-between">
        <label>Gross Earning</label>
        <label>{formatNumber(totalEarnings)}</label>
      </div>
      <div className="mt-4 text-[16px] flex justify-between">
        <label>Gross Deduction</label>
        <label> -{formatNumber(totalDeduction)}</label>
      </div>
      <div className="mt-4 text-[16px] flex justify-between">
        <label>Employee EPF(8%)</label>
        <label>-{(employeeEPF>0)?(formatNumber(employeeEPF)):0}</label>
      </div>
      <div className="mt-4 flex justify-between">
        <label>APIT</label>
        <label>-{formatNumber(APIT)}</label>
      </div>
      <div className="my-6 p-4 lg:w-[430px] h-[56px] w-[300px] font-semibold border border-b-gray-200 flex justify-between">
        <label>Net Salary(Take Home)</label>
        <label>{formatNumber(totalEarnings-employeeEPF-totalDeduction-APIT)}</label>
      </div>
      <label className="text-fontGray font-bold text-[14px]">Contribution from the Employer</label>
      <div className="mt-3 flex justify-between">
        <label>Employer EPF (12%)</label>
        <label>{formatNumber(employeeEPF12)}</label>
      </div>
      <div className="mt-4 flex justify-between">
        <label>Employer ETF (3%)</label>
        <label>{formatNumber(employeeEPF3)}</label>
      </div>
      <div className="mt-5 flex justify-between">
        <label>CTC (Cost to Company)</label>
        <label>{formatNumber(costToCompany)}</label>
      </div>
     
    </div>

  );
};

export default OutputSide;

