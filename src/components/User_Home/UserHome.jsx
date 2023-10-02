import { useContext } from "react";
import { UserContext } from "../Context";
import ExpenseTable from "./ExpenseTable";
import Transactions from "./Add_Transactions";
import Charts from "./Charts";
import "./User_Home.css";
import { useState } from "react";


function UserHome() {
  const { user } = useContext(UserContext);
  const userInfo = JSON.parse(localStorage.getItem(user));
  const { YearTransactions } = useContext(UserContext);

  
  function printingCategory() {
    const obj = {
      food: 0,
      transport: 0,
      shopping: 0,
      housing: 0,
      Healthcare: 0,
      fun: 0,
      other: 0,
    };
    if (YearTransactions !== undefined) {
      for (let index = 0; index < YearTransactions.length; index++) {
        const category = YearTransactions[index].Category;
        obj[category] += 1;
      }
    }
    return (
      <>
        <h3>
          This is how many expenses you had in each category in the current
          year:
        </h3>
        <p>
          food: {obj.food}, transport: {obj.transport}, shopping: {obj.shopping}
          , housing: {obj.housing}, Healthcare: {obj.Healthcare}, fun: {obj.fun}
          , other: {obj.other},
        </p>
      </>
    );
  }

  if (user) {
    return (
      <>
        <h1 className="welcome_text">Welcome {user}! </h1>
        <Transactions />
        {userInfo.Transactions ? (
          <>
            <div className="All_Categories">{printingCategory(userInfo)}</div>
            <br />
            <ExpenseTable />
            <div className="Charts_Container">  
              <Charts />
            </div>
          </>
        ) : (
          <h1>No transactions available</h1>
        )}
      </>
    );
  } else {
    return <h1>please log in first</h1>;
  }
}
export default UserHome;
