import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context";

export default function Chart_General({ months }) {
  const { YearTransactions } = useContext(UserContext);
  const [biggestTransaction, setBiggestTransaction] = useState({});
  const [biggestCategory, setBiggestCategory] = useState({
    Category: "biggest",
    Amount: 0,
  });
  const [biggestMonth, setbiggestmonth] = useState({
    month: "",
    Amount: 0,
    average: 0,
  });

  function findBiggestTransaction(transactions) {
    let maxAmount = 0;
    let biggestTransaction = {};
    for (let i = 0; i < transactions.length; i++) {
      const transaction = transactions[i];
      if (parseFloat(transaction.Amount) > maxAmount) {
        maxAmount = transaction.Amount;
        biggestTransaction = transaction;
      }
    }
    setBiggestTransaction(biggestTransaction);
  }
  function printingBiggestCategory(transactions) {
    const obj = {
      food: 0,
      transport: 0,
      shopping: 0,
      housing: 0,
      Healthcare: 0,
      fun: 0,
      other: 0,
    };
    for (let index = 0; index < transactions.length; index++) {
      const category = transactions[index].Category;
      obj[category] += 1;
    }
    let biggestCategory = "";
    let highestCount = 0;

    for (const category in obj) {
      if (obj[category] > highestCount) {
        biggestCategory = category;
        highestCount = obj[category];
      }
    }
    setBiggestCategory({ Category: biggestCategory, Amount: highestCount });
  }
  function findBiggestMonth(months) {
    let monthName = "";
    let biggestAmount = 0;
    let average = 0;
    for (const month in months) {
      const currentMonthAmount = months[month];
      if (currentMonthAmount > biggestAmount) {
        biggestAmount = currentMonthAmount;
        monthName = month;
      }
      average += currentMonthAmount;
    }
    average = Math.ceil(average / 12);
    setbiggestmonth({
      month: monthName,
      Amount: biggestAmount,
      average,
    });
  }
  useEffect(() => {
    findBiggestMonth(months);
  }, [months]);

  useEffect(() => {
    if (YearTransactions !== undefined) {
      findBiggestTransaction(YearTransactions);
      printingBiggestCategory(YearTransactions);
    }
  }, [YearTransactions]);
  return (
    <div className="general_Info_Container">
      <div className="Chart_general_info" id="biggestTransaction">
        <h3>The biggest transaction was:</h3>
        <strong>Category: </strong> {biggestTransaction.Category} <br />
        <strong>Date: </strong> {biggestTransaction.Date} <br />
        <strong>Amount: </strong> {biggestTransaction.Amount} ₪<br />
        <strong>Description: </strong> {biggestTransaction.Description}
        <br />
      </div>
      <div className="Chart_general_info" id="biggestCategory">
        <h3>The category you had the most expences is:</h3>
        <strong>
          {biggestCategory.Category} <br />{" "}
        </strong>{" "}
        You had {biggestCategory.Amount} expenses in that category
        <br />
      </div>
      <div className="Chart_general_info" id="biggestMonth">
        <h3>Biggest Month:</h3>
        <strong>{biggestMonth.month} </strong> <br />
        You spent {biggestMonth.Amount}₪ that month <br />
      </div>
      <div className="Chart_general_info" id="averegeMonth">
        <h3>In the last year </h3>
        <p>You spent on average  {biggestMonth.average}₪ a month</p>
      </div>
    </div>
  );
}
