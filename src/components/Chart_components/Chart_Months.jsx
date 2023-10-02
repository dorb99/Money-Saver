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

function Chart_Months({ months, setMonths }) {
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
  const [CharTransactions, setCharTransactions] = useState(
    userInfo.Transactions
  );
  const { chartType } = useContext(UserContext);
  const { YearTransactions } = useContext(UserContext);

  const getDate = (transaction) => {
    const date = new Date(transaction.Date);
    const month = date.getMonth() + 1;
    return [month];
  };

  const calculatemonths = () => {
    const updatedMonths = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };
    YearTransactions.forEach((transaction) => {
      const month = getDate(transaction);
      const monthArray = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      updatedMonths[monthArray[month]] += parseFloat(transaction.Amount) || 0;
    });

    setMonths(updatedMonths);
  };
  useEffect(() => {
    calculatemonths();
  }, [YearTransactions]);

  const data = {
    labels: Object.keys(months),
    datasets: [
      {
        label: "Money spent (₪)",
        data: Object.values(months),
        backgroundColor: [
          "rgba(0, 0, 0, 0.7)",
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 246, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
          "rgba(0, 128, 0, 0.7)",
          "rgba(255, 0, 0, 0.7)",
          "rgba(0, 255, 0, 0.7)",
          "rgba(0, 0, 255, 0.7)",
          "rgba(128, 128, 128, 0.7)",
        ],
      },
    ],
  };

  return (
    <>
      {chartType === "Pie by months" && <Pie data={data} />}
      {chartType === "Bar by months" && <Bar data={data} />}
    </>
  );
}

export default Chart_Months;
