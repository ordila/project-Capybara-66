import React from "react"
import styles from "./styles/ExpensesDonut.module.css"
import { Cell, Pie, PieChart } from "recharts"

export const ExpensesDonut = ({ data, colors }) => {
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
          fill='red'
          dataKey='sum'
          paddingAngle={0}
          stroke='none'
        >
          {data?.map((item, index) => (
            <Cell key={item._id} fill={colors[index]} className={styles.cell} />
          ))}
        </Pie>
      </PieChart>
      <p className={styles.donutPercents}>{data ? "100%" : ""}</p>
    </div>
  )
}
