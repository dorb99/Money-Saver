import React, { useContext, useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { UserContext } from "../Context";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend,
  BarElement,
} from "chart.js";
import _ from "lodash";

function Charts_Category() {
  ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
  );
  const { user } = useContext(UserContext);
  const userInfo = JSON.parse(localStorage.getItem(user));
  const [CharTransactions, setCharTransactions] = useState([
    userInfo.Transactions,
  ]);
  const { chartType } = useContext(UserContext);
  const { YearTransactions } = useContext(UserContext);
  const [categories, setCategories] = useState({
    food: 0,
    transport: 0,
    shopping: 0,
    housing: 0,
    Healthcare: 0,
    fun: 0,
    other: 0,
  });

  const calculateTotals = () => {
    const updatedCategories = {
      food: 0,
      transport: 0,
      shopping: 0,
      housing: 0,
      Healthcare: 0,
      fun: 0,
      other: 0,
    };

    YearTransactions.length > 0
      ? YearTransactions.forEach((transaction) => {
          const Categoryamount = parseFloat(transaction.Amount);
          if (!isNaN(Categoryamount)) {
            updatedCategories[transaction.Category] += Categoryamount;
          }
        })
      : null;

    setCategories(updatedCategories);
  };

  useEffect(() => {
    calculateTotals();
  }, [CharTransactions, YearTransactions]);

  useEffect(() => {
    if (!_.isEqual(CharTransactions, userInfo.Transactions)) {
      setCharTransactions(userInfo.Transactions);
    }
  }, [userInfo.Transactions, CharTransactions]);

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: "Money spent (₪)",
        data: Object.values(categories),
        backgroundColor: [
          "rgba(0, 0, 0, 0.7)",
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 246, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
          "rgba(0, 128, 0, 0.7)",
        ],
      },
    ],
  };
  return (
    <>
      {chartType === "Pie by categories" && <Pie data={data} />}
      {chartType === "Bar by categories" && <Bar data={data} />}
    </>
  );
}
export default Charts_Category;
