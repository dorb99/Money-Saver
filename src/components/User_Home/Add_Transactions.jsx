import { useContext, useState } from "react";
import { UserContext } from "../Context";
import { useForm } from "react-hook-form";
import { Modal } from "react-overlays";

function Transactions() {
  const [selectedCategory, setSelectedCategory] = useState();
  const { setFilteredTransactions, user } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [showModal, setShowModal] = useState(false);

  const renderBackdrop = (props) => (
    <div className="backdrop_adder" {...props} />
  );
  const onSubmit = (data) => {
    const oldTransactions =
      JSON.parse(localStorage.getItem(user))?.Transactions || [];
    const updatedTransactions = [...oldTransactions, data];
    const updatedUser = {
      ...JSON.parse(localStorage.getItem(user)),
      Transactions: updatedTransactions,
    };
    localStorage.setItem(user, JSON.stringify(updatedUser));
    setFilteredTransactions(updatedTransactions);
    reset();
    setShowModal(false);
  };

  if (user) {
    return (
      <>
        <button
          className="add-expense"
          onClick={() => {
            setShowModal(true), console.log("hi");
          }}
        >
          Add an expense
        </button>
        <Modal
          className="expense_Modal"
          show={showModal}
          onHide={() => setShowModal(false)}
          renderBackdrop={renderBackdrop}
        >
          <div id="modal-con">
            <form className="expense-form" onSubmit={handleSubmit(onSubmit)}>
              <span id="categoryInput">
                Category:
                <select
                  value={selectedCategory}
                  onChange={(event) => setSelectedCategory(event.target.value)}
                  {...register("Category")}
                  required={selectedCategory !== ""}
                >
                  <option value="">Select an option</option>
                  <option value="food">food</option>
                  <option value="transport">transport</option>
                  <option value="shopping">shopping</option>
                  <option value="housing">housing</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="fun">fun</option>
                  <option value="other">Other</option>
                </select>
              </span>
              <span>
                Amount:
                <input
                  {...register("Amount", {
                    required: true,
                    maxLength: 5,
                  })}
                />
                {errors.Amount && (
                  <p style={{ color: "red" }}>Amount is required</p>
                )}
              </span>
              <span>
                Date:
                <input
                  type="Date"
                  {...register("Date", {
                    required: true,
                    maxLength: 20,
                  })}
                />
                {errors.Date && (
                  <p style={{ color: "red" }}>Date is required</p>
                )}
              </span>
              <span>
                Description:
                <input
                  {...register("Description", {
                    required: true,
                  })}
                />
                {errors.Description && (
                  <p style={{ color: "red" }}>Description is required</p>
                )}
              </span>

              <input type="submit"></input>
              <div id="closing_btn" onClick={() => setShowModal(false)}>
                X
              </div>
            </form>
          </div>
        </Modal>
      </>
    );
  } else {
    return <h1>please log in first</h1>;
  }
}
export default Transactions;
