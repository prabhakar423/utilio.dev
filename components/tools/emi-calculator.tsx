'use client'

import { useState } from 'react'

export function EmiCalculator() {
  const [principal, setPrincipal] = useState(100000)
  const [rate, setRate] = useState(8.5)
  const [tenure, setTenure] = useState(12)
  const [result, setResult] = useState<{
    monthlyEmi: number
    totalAmount: number
    totalInterest: number
  } | null>(null)

  const handleCalculate = () => {
    if (principal <= 0 || rate < 0 || tenure <= 0) {
      setResult(null)
      return
    }

    const monthlyRate = rate / 12 / 100
    const numberOfMonths = tenure

    let monthlyEmi = 0
    if (monthlyRate === 0) {
      monthlyEmi = principal / numberOfMonths
    } else {
      monthlyEmi =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
        (Math.pow(1 + monthlyRate, numberOfMonths) - 1)
    }

    const totalAmount = monthlyEmi * numberOfMonths
    const totalInterest = totalAmount - principal

    setResult({
      monthlyEmi,
      totalAmount,
      totalInterest,
    })
  }

  return (
    <div className="grid gap-4">
      <div className="space-y-4 p-4 rounded-lg bg-card border border-border">
        <div>
          <label className="block text-sm font-medium mb-2">
            Loan Amount (₹): {principal.toLocaleString()}
          </label>
          <input
            type="range"
            min="10000"
            max="10000000"
            step="10000"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full"
          />
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full mt-2 px-3 py-2 border border-border rounded-lg bg-secondary text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Annual Interest Rate (%): {rate.toFixed(2)}%
          </label>
          <input
            type="range"
            min="0"
            max="30"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full"
          />
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            step="0.1"
            className="w-full mt-2 px-3 py-2 border border-border rounded-lg bg-secondary text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Loan Tenure (Months): {tenure}
          </label>
          <input
            type="range"
            min="1"
            max="480"
            step="1"
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full"
          />
          <input
            type="number"
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full mt-2 px-3 py-2 border border-border rounded-lg bg-secondary text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          Calculate EMI
        </button>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="text-sm text-muted-foreground">Monthly EMI</div>
              <div className="text-3xl font-bold text-primary mt-1">
                ₹{result.monthlyEmi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="text-sm text-muted-foreground">Total Interest</div>
              <div className="text-3xl font-bold text-accent mt-1">
                ₹{result.totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="text-sm text-muted-foreground">Total Amount Payable</div>
              <div className="text-3xl font-bold text-primary mt-1">
                ₹{result.totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-secondary border border-border">
            <h3 className="font-semibold text-sm mb-3">Payment Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Loan Amount:</span>
                <span className="font-medium">₹{principal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Annual Interest Rate:</span>
                <span className="font-medium">{rate.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Loan Tenure:</span>
                <span className="font-medium">{tenure} months ({(tenure / 12).toFixed(1)} years)</span>
              </div>
              <div className="border-t border-border my-2 pt-2 flex justify-between">
                <span className="text-muted-foreground">Monthly EMI:</span>
                <span className="font-bold">₹{result.monthlyEmi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
