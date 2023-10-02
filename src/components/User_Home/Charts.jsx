  import Chart_Months from "../Chart_components/Chart_Months";
  import Charts_Category from "../Chart_components/chart_Category";
  import React, { useContext, useEffect, useState } from "react";
  import { UserContext } from "../Context";
  import _ from "lodash";
  import SetYear from "../Chart_components/SetYear";
import Chart_General from "../Chart_components/Chart_General";


  function Charts() {
    const { user } = useContext(UserContext);
    const userInfo = JSON.parse(localStorage.getItem(user));
    const [CharTransactions] = useState([userInfo.Transactions]);
    const { chartType, setChartType } = useContext(UserContext);
    const [months, setMonths] = useState({
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
    });

      return (
        <>
        {CharTransactions.length > 0 ? (
          <form onSubmit={(e) => e.preventDefault()}>
            <span>
              <select
              defaultValue={chartType}
                onChange={(event) => setChartType(event.target.value)}
                >
                <option value="">General information</option>
                <option value="Pie by categories">Pie by categories</option>
                <option value="Bar by categories">Bar by categories</option>
                <option value="Pie by months">Pie by months</option>
                <option value="Bar by months">Bar by months</option>
              </select>
            </span>
            <br/>
            <br/>
            <SetYear/>
          </form>
          
        ) : (
          <div>Loading data...</div>
          )}
        {chartType === "" && <Chart_General months={months}/>}
        {chartType === "Pie by categories" && <Charts_Category />}
        {chartType === "Bar by categories" && <Charts_Category />}
        {chartType === "Pie by months" && <Chart_Months months={months} setMonths={setMonths}/>}
        {chartType === "Bar by months" && <Chart_Months months={months} setMonths={setMonths}/>}
      </>
    );

  }
  export default Charts;
