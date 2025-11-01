"use client";

import { useState, useMemo } from "react";
import {
  calculateTaxes,
  getStatesList,
  type TaxResult,
} from "../utils/taxCalculations";
import {
  calculateCompoundGrowth,
  type InvestmentData,
} from "../utils/investmentCalculations";
import InvestmentChart from "./InvestmentChart";

export default function Calculator() {
  const [salary, setSalary] = useState<string>("75000");
  const [dependents, setDependents] = useState<string>("0");
  const [state, setState] = useState<string>("California");
  const [investmentPercent, setInvestmentPercent] = useState<number>(15);
  const [currentAge, setCurrentAge] = useState<string>("25");

  const states = useMemo(() => getStatesList(), []);

  // Format salary with commas for display
  const formatSalaryDisplay = (value: string) => {
    const num = parseFloat(value.replace(/,/g, ""));
    if (isNaN(num)) return "";
    return num.toLocaleString("en-US");
  };

  // Handle salary input change
  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, ""); // Remove commas
    if (value === "" || /^\d+$/.test(value)) {
      setSalary(value);
    }
  };

  // Calculate taxes
  const taxResult: TaxResult = useMemo(() => {
    const salaryNum = parseFloat(salary) || 0;
    const dependentsNum = parseInt(dependents) || 0;
    return calculateTaxes(salaryNum, dependentsNum, state);
  }, [salary, dependents, state]);

  // Calculate investment growth
  const investmentData: InvestmentData[] = useMemo(() => {
    const annualInvestment = (taxResult.netIncome * investmentPercent) / 100;
    const age = parseInt(currentAge) || 25;
    const yearsToProject = Math.max(1, 80 - age); // Project until age 80
    return calculateCompoundGrowth(annualInvestment, yearsToProject, age);
  }, [taxResult.netIncome, investmentPercent, currentAge]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const annualInvestment = (taxResult.netIncome * investmentPercent) / 100;
  const finalValue = investmentData[investmentData.length - 1]?.value || 0;
  const totalInvested = investmentData[investmentData.length - 1]?.invested || 0;
  const totalGains = finalValue - totalInvested;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
          Money for Life
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Hey kids, let's learn about compound interest!<br/>Just remember: Saving and investing is boring <em>now</em>, but <em>super fun later!</em> 6-7!
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Your Financial Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Salary Input */}
          <div>
            <label
              htmlFor="salary"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Annual Salary
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="text"
                id="salary"
                value={formatSalaryDisplay(salary)}
                onChange={handleSalaryChange}
                className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="75,000"
              />
            </div>
          </div>

          {/* Age to Start Investing Input */}
          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Age to Start Investing
            </label>
            <input
              type="number"
              id="age"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="25"
              min="15"
              max="80"
            />
          </div>

          {/* Dependents Input */}
          <div>
            <label
              htmlFor="dependents"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Number of Dependents
            </label>
            <input
              type="number"
              id="dependents"
              value={dependents}
              onChange={(e) => setDependents(e.target.value)}
              min="0"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="0"
            />
          </div>

          {/* State Select */}
          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              State
            </label>
            <select
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tax Breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Federal Tax
            </p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {formatCurrency(taxResult.federalTax)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              State Tax
            </p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {formatCurrency(taxResult.stateTax)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Social Security
            </p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {formatCurrency(taxResult.socialSecurity)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Medicare
            </p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {formatCurrency(taxResult.medicare)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Total Tax
            </p>
            <p className="text-sm font-semibold text-red-600 dark:text-red-400">
              {formatCurrency(taxResult.totalTax)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Effective Rate
            </p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {taxResult.effectiveTaxRate.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Net Income Display */}
        <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                Your Annual Net Income
              </p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(taxResult.netIncome)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                Monthly Take-Home
              </p>
              <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
                {formatCurrency(taxResult.netIncome / 12)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Investment Strategy
        </h2>

        {/* Investment Slider */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Percentage of Net Income to Invest
            </label>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {investmentPercent}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={investmentPercent}
            onChange={(e) => setInvestmentPercent(parseInt(e.target.value))}
            className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Investment Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Annual Investment
            </p>
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {formatCurrency(annualInvestment)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {formatCurrency(annualInvestment / 12)}/month
            </p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Total Invested (until age 80)
            </p>
            <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
              {formatCurrency(totalInvested)}
            </p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Projected Value
            </p>
            <p className="text-xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(finalValue)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Gains: {formatCurrency(totalGains)}
            </p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Growth Over Time
        </h2>
        <InvestmentChart data={investmentData} />
      </div>

      {/* Footer Note */}
      <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Note:</strong> This calculator uses 2025 tax brackets and assumes a 9%
          average annual return based on historical S&P 500 performance. Tax rates are
          simplified for demonstration purposes. Actual returns may vary. This is not
          financial advice.
        </p>
      </div>
    </div>
  );
}

