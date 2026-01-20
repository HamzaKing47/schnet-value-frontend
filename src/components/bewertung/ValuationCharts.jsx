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

const COLORS = ["#058996", "#16a34a", "#f59e0b", "#8b5cf6"];

export default function ValuationCharts({ result }) {
  const { breakdown, marketValue } = result;

  const chartData = [
    {
      name: "Vergleichswert",
      value: breakdown.comparativeValue || 0,
      color: COLORS[0],
    },
    {
      name: "Ertragswert",
      value: breakdown.incomeValue || 0,
      color: COLORS[1],
    },
    {
      name: "Sachwert",
      value: breakdown.costValue || 0,
      color: COLORS[2],
    },
  ].filter((d) => d.value > 0);

  const barData = [
    ...chartData,
    {
      name: "Marktwert",
      value: marketValue || 0,
      color: COLORS[3],
    },
  ];

  // Calculate percentages for pie chart
  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  const pieDataWithPercentage = chartData.map(item => ({
    ...item,
    percentage: total > 0 ? Math.round((item.value / total) * 100) : 0,
  }));

  return (
    <div className="space-y-8">
      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Donut Chart */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <h3 className="font-semibold text-textDark mb-4">
            Verfahrensverteilung
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieDataWithPercentage}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                >
                  {pieDataWithPercentage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), "Wert"]}
                  labelFormatter={(name) => `${name}`}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center text-sm text-textMuted">
            Anteile der einzelnen Bewertungsverfahren
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <h3 className="font-semibold text-textDark mb-4">
            Wertvergleich (€)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tickFormatter={(value) => 
                    value >= 1000000 
                      ? `${(value / 1000000).toFixed(1)}M` 
                      : value >= 1000 
                        ? `${(value / 1000).toFixed(0)}k` 
                        : value
                  }
                />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), "Wert"]}
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[4, 4, 0, 0]}
                >
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 text-center">
            <div className="text-lg font-bold text-textDark">
              Marktwert: {formatCurrency(marketValue)}
            </div>
            <div className="text-sm text-textMuted mt-1">
              Endgültiger berechneter Wert
            </div>
          </div>
        </div>
      </div>

      {/* Value Breakdown */}
      {chartData.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <h3 className="font-semibold text-textDark mb-4">
            Detaillierte Wertaufschlüsselung
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-textDark font-medium">Bewertungsverfahren</th>
                  <th className="text-right py-3 px-4 text-textDark font-medium">Berechneter Wert</th>
                  <th className="text-right py-3 px-4 text-textDark font-medium">Anteil am Gesamtwert</th>
                  <th className="text-right py-3 px-4 text-textDark font-medium">Standardabweichung</th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-3"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      {formatCurrency(item.value)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {total > 0 ? `${Math.round((item.value / total) * 100)}%` : "0%"}
                    </td>
                    <td className="py-3 px-4 text-right text-textMuted">
                      ± {formatCurrency(item.value * 0.05)} {/* Example deviation */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Confidence Indicator */}
      <div className="bg-gradient-to-r from-primaryLighter to-white border border-primary/20 rounded-xl p-6">
        <h3 className="font-semibold text-textDark mb-4">
          Bewertungsqualität
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-textDark">Datengrundlage</span>
            <div className="flex items-center">
              {chartData.map((_, index) => (
                <div
                  key={index}
                  className={`w-8 h-2 rounded mx-1 ${
                    index < chartData.length ? "bg-primary" : "bg-gray-200"
                  }`}
                ></div>
              ))}
              <span className="ml-3 text-sm font-medium">
                {chartData.length} von 3 Verfahren verwendet
              </span>
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-full h-2.5">
            <div 
              className="bg-primary h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${(chartData.length / 3) * 100}%` }}
            ></div>
          </div>
          
          <div className="text-sm text-textMuted">
            Die Bewertungsqualität erhöht sich mit der Anzahl der verwendeten Verfahren.
            Ideal sind alle drei Verfahren für eine umfassende Bewertung.
          </div>
        </div>
      </div>
    </div>
  );
}