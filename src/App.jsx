import { Routes, Route } from "react-router-dom";
import Navbar from "./components/General_Components/Navbar";
import ErrorPage from "./components/General_Components/ErrorPage";
import Homepage from "./components/Login/Homepage";
import { UserContext } from "./components/Context";
import UserHome from "./components/User_Home/UserHome";
import { useEffect, useState } from "react";
import "./css_files/app.css";
import Footer from "./components/General_Components/Footer";
import { ToastContainer } from "react-toastify";

function App() {
  const [user, setUser] = useState();
  const [filteredTransactions, setFilteredTransactions] = useState(
    JSON.parse(localStorage.getItem(user))?.Transactions || []
  );
  const [chartType, setChartType] = useState("");
  const [YearTransactions, setYearTransactions] = useState();

  useEffect(() => {
    if (user) {
      setFilteredTransactions(
        JSON.parse(localStorage.getItem(user)).Transactions
      );
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        YearTransactions,
        setYearTransactions,
        user,
        setUser,
        filteredTransactions,
        setFilteredTransactions,
        chartType,
        setChartType,
      }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/UserHome" element={<UserHome />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </UserContext.Provider>
  );
}

export default App;
