import React from "react";
import "./mortgageCalculator.css"

export default function MortgageCalculator() {
  const { formData, setData, result, calculateResult } = useMortgateCalculation();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    calculateResult();
  }

  return (
    <div className="mortgage-calculator">
      <form onSubmit={handleSubmit} className="calculation-form">
        <div className="field">
          <label htmlFor="amount">{"Loan amount"}</label>
          <input required id="amount" type="number" min="1" name="amount" value={formData.amount} onChange={e => setData("amount", e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="apr">{"Anual percentage rate (%)"}</label>
          <input required id="apr" type="number" min="0.1" max="100" step=".1" name="apr" value={formData.apr} onChange={e => setData("apr", e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="term">{"Loan term (years)"}</label>
          <input id="term" type="number" min="1" max="100" name="term" value={formData.term} onChange={e => setData("term", e.target.value)} />
        </div>
        <button type="submit" className="submit-button">{"Submit"}</button>
      </form>
      { result && <Results result={result} />}
    </div>
  );
}

function Results({ result }: { result: LoanResult }) {
  const currencyFormatter = new Intl.NumberFormat(
    'en-US',
    {
      style: 'currency',
      currency: 'USD',
    },
  );

  return (
    <div className="results-panel" aria-live="polite">
      <div>{"Montly payment: "} <strong>{currencyFormatter.format(result.monthlyPayment)}</strong></div>
      <div>{"Total paid: "} <strong>{currencyFormatter.format(result.totalPayment)}</strong></div>
      <div>{"Total interest paid: "} <strong>{currencyFormatter.format(result.totalInterest)}</strong></div>
    </div>
  );
}

interface LoanFormData {
  amount: number;
  apr: number;
  term: number;
}

interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

function useMortgateCalculation() {
  const [formData, setFormData] = React.useState<LoanFormData>({ amount: 100000, apr: 3, term: 30 });
  const [displayResult, setDisplayResult] = React.useState(false);

  const setData = (name: keyof LoanFormData, value: string) => {
    const numerical = Number(value);

    // TODO: add error if number is not numeric... enforced by UI but should also be checked here.

    setDisplayResult(false);
    setFormData(prev => {
      return { ...prev, [name]: numerical };
    })
  }

  // memoize based on when formData changes...
  const result = displayResult ? calculateMortgage(formData.amount, formData.apr, formData.term) : undefined;



  return {
    formData,
    setData,
    calculateResult: () => setDisplayResult(true),
    result 
  }
}

function calculateMortgage(amount: number, apr: number, term: number) {
  // M = P(i(1+i)^n)/((1+i)^n - 1)

  // M: Monthly mortgage payment
  // P: Loan amount
  // i: Monthly interest rate(APR / 12)
  // n: Total number of payments(loan term in years x 12)

  const n = term * 12;
  const i = apr / 12 / 100;
  const P = amount;
  const M = P * (i * (Math.pow(1+i, n))) / (Math.pow(1+i, n) - 1);

  const totalPayment = M * n

  return {
    monthlyPayment: M,
    totalPayment,
    totalInterest: totalPayment - amount
  }
}