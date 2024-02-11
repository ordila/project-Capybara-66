import React from 'react'
import styles from './styles/ExpensesMain.module.css'
import { Cell, Pie, PieChart } from 'recharts';

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 200 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 50 },
  { name: "Group D", value: 200 },
];
const COLORS = ["#0088FE", "#101010", "#00C49F", "#FFBB28", "#FF8042"];

export const ExpensesDonut = () => {
  return (
    <div className={styles.chart}>
      <PieChart width={292} height={150}>
        <Pie
          data={data}
          cy={143}
          innerRadius={95}
          outerRadius={145}
          startAngle={180}
          endAngle={0}
          fill="red"
          dataKey="value"
          paddingAngle={0}
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}
