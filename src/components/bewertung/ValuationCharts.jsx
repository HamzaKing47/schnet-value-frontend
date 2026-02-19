import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { formatCurrency } from "../../utils/format";

const COLORS = {
  comparative: "#058996",
  income: "#16a34a",
  cost: "#f59e0b",
  market: "#8b5cf6",
};

export default function ValuationCharts({ result }) {
  if (!result?.breakdown || !result?.weights) return null;

  const { breakdown, weights, marketValue } = result;

  /* ---------- METHODS USED ---------- */
  const methods = [
    {
      key: "comparative",
      name: "Vergleichswert",
      value: breakdown.comparativeValue,
      weight: weights.comparative,
      color: COLORS.comparative,
    },
    {
      key: "income",
      name: "Ertragswert",
      value: breakdown.incomeValue,
      weight: weights.income,
      color: COLORS.income,
    },
    {
      key: "cost",
      name: "Sachwert",
      value: breakdown.costValue,
      weight: weights.cost,
      color: COLORS.cost,
    },
  ].filter((m) => typeof m.value === "number" && m.value > 0);

  /* ---------- PIE (WEIGHTS) ---------- */
  const pieData = methods.map((m) => ({
    name: m.name,
    value: Math.round((m.weight || 0) * 100),
    color: m.color,
  }));

  /* ---------- BAR (VALUES) ---------- */
  const barData = [
    ...methods.map((m) => ({
      name: m.name,
      value: m.value,
      color: m.color,
    })),
    {
      name: "Marktwert",
      value: marketValue,
      color: COLORS.market,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PIE */}
        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="font-semibold mb-4">
            Gewichtung der Bewertungsverfahren
          </h3>

          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                innerRadius={60}
                outerRadius={90}
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {pieData.map((e, i) => (
                  <Cell key={i} fill={e.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>

          <p className="mt-4 text-sm text-center text-textMuted">
            Prozentuale Gewichtung gemäß ImmoWertV
          </p>
        </div>

        {/* BAR */}
        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="font-semibold mb-4">Wertvergleich (€)</h3>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                tickFormatter={(v) =>
                  v >= 1_000_000
                    ? `${(v / 1_000_000).toFixed(1)}M`
                    : v >= 1_000
                    ? `${(v / 1_000).toFixed(0)}k`
                    : v
                }
              />
              <Tooltip formatter={(v) => formatCurrency(v)} />
              <Bar dataKey="value">
                {barData.map((e, i) => (
                  <Cell key={i} fill={e.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-4 text-center">
            <div className="text-lg font-bold">
              Marktwert: {formatCurrency(marketValue)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}