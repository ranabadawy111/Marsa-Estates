import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calculator } from "lucide-react";
import Card from "../ui/Card";

function formatMoney(n) {
  return Math.round(n).toLocaleString();
}

export default function MortgageCalculator({ price }) {
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [years, setYears] = useState(15);
  const [ratePct, setRatePct] = useState(18); // typical EGP mortgage rate range

  const { monthlyPayment, downPayment, loanAmount, totalPaid, totalInterest } = useMemo(() => {
    const dp = price * (downPaymentPct / 100);
    const principal = price - dp;
    const monthlyRate = ratePct / 100 / 12;
    const numPayments = years * 12;

    const payment =
      monthlyRate === 0
        ? principal / numPayments
        : (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments));

    const total = payment * numPayments;

    return {
      monthlyPayment: payment,
      downPayment: dp,
      loanAmount: principal,
      totalPaid: total,
      totalInterest: total - principal,
    };
  }, [price, downPaymentPct, years, ratePct]);

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-full bg-sage-500/15 flex items-center justify-center">
          <Calculator size={15} className="text-sage-600" />
        </div>
        <h3 className="font-display text-lg text-navy-900">Mortgage estimate</h3>
      </div>

      <SliderField
        label="Down payment"
        value={downPaymentPct}
        onChange={setDownPaymentPct}
        min={5}
        max={60}
        step={5}
        display={`${downPaymentPct}% · EGP ${formatMoney(downPayment)}`}
      />
      <SliderField
        label="Loan term"
        value={years}
        onChange={setYears}
        min={5}
        max={30}
        step={5}
        display={`${years} years`}
      />
      <SliderField
        label="Interest rate"
        value={ratePct}
        onChange={setRatePct}
        min={10}
        max={26}
        step={0.5}
        display={`${ratePct}%`}
      />

      <div className="mt-6 pt-5 border-t border-navy-700/[0.08]">
        <p className="text-xs font-mono uppercase tracking-wide text-navy-700/50 mb-1">
          Estimated monthly payment
        </p>
        <motion.p
          key={monthlyPayment}
          initial={{ opacity: 0.4, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl text-navy-900 mb-4"
        >
          EGP {formatMoney(monthlyPayment)}
        </motion.p>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <MiniStat label="Loan amount" value={`EGP ${formatMoney(loanAmount)}`} />
          <MiniStat label="Total interest" value={`EGP ${formatMoney(totalInterest)}`} />
        </div>
      </div>

      <p className="text-[11px] text-navy-700/40 mt-4 leading-relaxed">
        Estimate only — actual rates and eligibility depend on the lender and
        buyer profile.
      </p>
    </Card>
  );
}

function SliderField({ label, value, onChange, min, max, step, display }) {
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono uppercase tracking-wide text-navy-700/60">
          {label}
        </span>
        <span className="text-xs font-mono text-navy-800">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none bg-navy-700/10 accent-sage-600 cursor-pointer"
      />
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="bg-navy-700/[0.04] rounded-xl px-3.5 py-3">
      <p className="text-[10px] font-mono uppercase tracking-wide text-navy-700/50 mb-1">
        {label}
      </p>
      <p className="font-mono text-sm text-navy-900">{value}</p>
    </div>
  );
}
