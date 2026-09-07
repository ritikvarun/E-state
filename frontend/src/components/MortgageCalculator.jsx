import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, Calendar } from 'lucide-react';

export default function MortgageCalculator({ defaultPrice = 2500000 }) {
  const [homePrice, setHomePrice] = useState(defaultPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTermYears, setLoanTermYears] = useState(30);

  const downPaymentAmount = (homePrice * downPaymentPercent) / 100;
  const principal = homePrice - downPaymentAmount;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;

  let monthlyPayment = 0;
  if (monthlyRate > 0) {
    monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  } else {
    monthlyPayment = principal / numberOfPayments;
  }

  const propertyTax = (homePrice * 0.012) / 12;
  const homeInsurance = 250;
  const totalMonthly = monthlyPayment + propertyTax + homeInsurance;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-6">
      <div className="flex items-center gap-2.5">
        <div className="p-2 bg-blue-600 text-white rounded-xl">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">Mortgage Estimator</h3>
          <p className="text-xs text-slate-500">Calculate estimated monthly financing</p>
        </div>
      </div>

      <div className="space-y-4 text-xs font-semibold text-slate-700">
        
        {/* Home Price */}
        <div>
          <div className="flex justify-between mb-1.5">
            <span>Property Purchase Price</span>
            <span className="text-slate-900 font-extrabold">${homePrice.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="100000"
            max="40000000"
            step="50000"
            value={homePrice}
            onChange={(e) => setHomePrice(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg accent-blue-600"
          />
        </div>

        {/* Down Payment % */}
        <div>
          <div className="flex justify-between mb-1.5">
            <span>Down Payment ({downPaymentPercent}%)</span>
            <span className="text-slate-900 font-extrabold">${downPaymentAmount.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="5"
            max="50"
            step="5"
            value={downPaymentPercent}
            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg accent-blue-600"
          />
        </div>

        {/* Interest Rate & Term */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block mb-1 text-slate-600">Interest Rate (%)</label>
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-900"
            />
          </div>
          <div>
            <label className="block mb-1 text-slate-600">Loan Term (Years)</label>
            <select
              value={loanTermYears}
              onChange={(e) => setLoanTermYears(Number(e.target.value))}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-900"
            >
              <option value={15}>15 Years Fixed</option>
              <option value={30}>30 Years Fixed</option>
            </select>
          </div>
        </div>

      </div>

      {/* Result box */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-3">
        <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">Estimated Total Monthly Payment</span>
        <p className="text-3xl font-extrabold tracking-tight text-blue-400">
          ${Math.round(totalMonthly).toLocaleString()}
          <span className="text-xs text-slate-400 font-normal">/mo</span>
        </p>

        <div className="pt-3 border-t border-slate-800 space-y-1.5 text-xs text-slate-300">
          <div className="flex justify-between">
            <span>Principal & Interest</span>
            <span className="font-bold">${Math.round(monthlyPayment).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Est. Property Tax</span>
            <span className="font-bold">${Math.round(propertyTax).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Home Insurance</span>
            <span className="font-bold">${homeInsurance}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
