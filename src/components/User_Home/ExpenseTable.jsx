import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context";
import _ from "lodash";

function ExpenseTable() {
  const { user } = useContext(UserContext);
  const [SelectedFilters, setSelectedFilters] = useState({
    Category: "all",
    Month: "all",
    Year: "2023",
  });
  const userInfo = JSON.parse(localStorage.getItem(user));
  const { filteredTransactions, setFilteredTransactions } =
    useContext(UserContext);
  const [prevTransactions, setPrevTransactions] = useState([]);

  function Sortarr(Transactions) {
    Transactions.sort((a, b) => {
      const dateA = new Date(a.Date);
      const dateB = new Date(b.Date);
      return dateA - dateB;
    });
    return Transactions;
  }
  useEffect(() => {
    let filtered = userInfo.Transactions;
    if (SelectedFilters.Category !== "all") {
      filtered = filtered.filter(
        (transaction) => transaction.Category === SelectedFilters.Category
      );
    }
    if (SelectedFilters.Month !== "all") {
      const selectedMonthAsNumber = parseInt(SelectedFilters.Month);
      filtered = filtered.filter((transaction) => {
        const date = getDate(transaction);
        const transactionMonthAsNumber = parseInt(date[1]);
        return transactionMonthAsNumber === selectedMonthAsNumber;
      });
    }
    if (SelectedFilters.Year !== "all") {
      const selectedYearAsNumber = parseInt(SelectedFilters.Year);
      filtered = filtered.filter((transaction) => {
        const date = getDate(transaction);
        const transactionYearAsNumber = parseInt(date[0]);
        return transactionYearAsNumber === selectedYearAsNumber;
      });
    }
    setFilteredTransactions(filtered);
  }, [SelectedFilters]);

  useEffect(() => {
    if (_.isEqual(filteredTransactions, prevTransactions)) {
      return;
    }
    Sortarr(filteredTransactions);
    setFilteredTransactions(filteredTransactions);
    setPrevTransactions(filteredTransactions);
  }, [filteredTransactions]);

  function getDate(transaction) {
    const turningIntoDate = new Date(transaction.Date);
    const date = [];
    date[0] = turningIntoDate.getFullYear();
    date[1] = turningIntoDate.getMonth();
    date[1] += 1;
    return date;
  }

  function printingamount(userInfo) {
    let sum = 0;
    const amountinfo = filteredTransactions;
    for (let index = 0; index < amountinfo.length; index++) {
      sum = sum + parseInt(filteredTransactions[index].Amount);
    }
    return sum;
  }
  const handleDelete = (index) => {
    const newarray = [...userInfo.Transactions];
    newarray.splice(index, 1);
    const updatedUser = {
      ...userInfo,
      Transactions: newarray,
    };
    localStorage.setItem(user, JSON.stringify(updatedUser));
    setFilteredTransactions(newarray);
  };
  return (
    <>
    <div className="select-container">
      What category would you like to see?:
      <select
        value={SelectedFilters.Category}
        onChange={(event) =>
          setSelectedFilters({
            ...SelectedFilters,
            Category: event.target.value,
          })
        }
      >
        <option value="all">all category</option>
        <option value="food">food</option>
        <option value="transport">transport</option>
        <option value="shopping">shopping</option>
        <option value="housing">housing</option>
        <option value="Healthcare">Healthcare</option>
        <option value="fun">fun</option>
        <option value="other">Other</option>
      </select>
      <select
        value={SelectedFilters.Month}
        onChange={(event) =>
          setSelectedFilters({
            ...SelectedFilters,
            Month: event.target.value,
          })
        }
      >
        <option value="all">all month</option>
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
      <select
        value={SelectedFilters.Year}
        onChange={(event) =>
          setSelectedFilters({
            ...SelectedFilters,
            Year: event.target.value,
          })
        }
      >
        <option value="all"> all year</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2024">2024</option>
      </select>
      </div>
      <table id="expense-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((element, index) => (
              <tr key={index}>
                <td>{element.Category}</td>
                <td>{element.Date}</td>
                <td>{element.Amount} ₪</td>
                <td>{element.Description}</td>
                <td>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">
                No transactions available in the selected category.
              </td>
            </tr>
          )}
          <tr>
            <td colSpan="3">Total Amount:</td>
            <td colSpan="2">{printingamount(userInfo)}₪</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default ExpenseTable;
