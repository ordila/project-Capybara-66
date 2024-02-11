import React from 'react'
import styles from './styles/ExpensesList.module.css'
const data = [
  {
    _id: "65c7583bf1df95584aa2e8e6",
    type: "expenses",
    date: "2022-12-28",
    time: "19:45",
    category: {
      _id: "65c7581cf1df95584aa2e8e0",
      categoryName: "food",
    },
    sum: 700,
    comment: "December salary",
  },
  {
    _id: "65c7583ef1df95584aa2e8eb",
    type: "expenses",
    date: "2022-12-28",
    time: "19:45",
    category: {
      _id: "65c7581cf1df95584aa2e8e0",
      categoryName: "food",
    },
    sum: 800,
    comment: "December salary",
  },
  {
    _id: "65c75840f1df95584aa2e8f0",
    type: "expenses",
    date: "2022-12-28",
    time: "19:45",
    category: {
      _id: "65c7581cf1df95584aa2e8e0",
      categoryName: "food",
    },
    sum: 900,
    comment: "December salary",
  },
  {
    _id: "65c75844f1df95584aa2e8f5",
    type: "expenses",
    date: "2022-12-28",
    time: "19:45",
    category: {
      _id: "65c7581cf1df95584aa2e8e0",
      categoryName: "food",
    },
    sum: 1000,
    comment: "December salary",
  },
  {
    _id: "65c7584bf1df95584aa2e8fa",
    type: "expenses",
    date: "2022-12-28",
    time: "19:45",
    category: {
      _id: "65c7581cf1df95584aa2e8e0",
      categoryName: "food",
    },
    sum: 1000,
    comment: "food",
  },
  {
    _id: "65c75851f1df95584aa2e8ff",
    type: "expenses",
    date: "2022-12-28",
    time: "19:45",
    category: {
      _id: "65c7581cf1df95584aa2e8e0",
      categoryName: "food",
    },
    sum: 5000,
    comment: "drink",
  },
  {
    _id: "65c75859f1df95584aa2e904",
    type: "expenses",
    date: "2022-12-28",
    time: "19:45",
    category: {
      _id: "65c7581cf1df95584aa2e8e0",
      categoryName: "food",
    },
    sum: 3000,
    comment: "cat",
  },
  {
    _id: "65c7585ef1df95584aa2e909",
    type: "expenses",
    date: "2022-12-28",
    time: "19:45",
    category: {
      _id: "65c7581cf1df95584aa2e8e0",
      categoryName: "food",
    },
    sum: 13000,
    comment: "dog",
  },
  {
    _id: "65c75864f1df95584aa2e90e",
    type: "expenses",
    date: "2022-12-28",
    time: "19:45",
    category: {
      _id: "65c7581cf1df95584aa2e8e0",
      categoryName: "food",
    },
    sum: 130000,
    comment: "capibara",
  },
];
export const ExpensesList = () => {
  return (
    <ul className={styles.list}>ExpensesList</ul>
  )
}
