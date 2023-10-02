import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context";
import _ from "lodash";

export default function SetYear() {
  const { YearTransactions, setYearTransactions } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const userInfo = JSON.parse(localStorage.getItem(user));
  const [CharTransactions] = useState([userInfo.Transactions]);
  const date = new Date();
  const year = date.getFullYear();
  const [displayThisYear, setdispalyThisYear] = useState(year);

  const getDate = (transaction) => {
    const date = new Date(transaction.Date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return [year, month];
  };
  useEffect(() => {
    function filterYear() {
      const newtransactions = CharTransactions[0].filter((transaction) => {
        const date = getDate(transaction);
        return parseInt(date[0]) === displayThisYear;
      });
      setYearTransactions(newtransactions);
    }
    filterYear();
  }, [CharTransactions, displayThisYear]);

  const ChangeYear = () => {
    if (displayThisYear === year) setdispalyThisYear(year - 1);
    else setdispalyThisYear(year);
  };
  return (
    <span>
      <button onClick={ChangeYear}>
        {displayThisYear === 2023 ? (
          <>Show last year information</>
        ) : (
          <>Show current year information</>
        )}
      </button>
    </span>
  );
}
