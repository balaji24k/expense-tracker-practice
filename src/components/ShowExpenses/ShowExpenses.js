import { useSelector, useDispatch } from "react-redux";
import classes from "./ShowExpenses.module.css";
import { ExpenseActions } from "../../store/ExpenseSlice";
import { Button, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";

const ShowExpenses = () => {
  const [isLoading, setIsLoading] = useState(null);
  const sendRequest = useHttp();
  const dispatch = useDispatch();

  const expenses = useSelector((state) => state.expense.expenses);
    console.log(expenses,"expenses showExpense");

  const userEmail = localStorage.getItem('userEmail');
  const userName = userEmail && userEmail.split('@')[0];

  useEffect(() => {
    const getData = async() => {
      try {
        const data = await sendRequest();
        let loadedProducts = []
        if (data) {
          loadedProducts = Object.keys(data).map(id => ({ id, ...data[id] }));
        }
        dispatch(ExpenseActions.replaceExpense(loadedProducts));
      } 
      catch (error) {
        console.log(error);
      }
    };
    userName &&  getData();
  }, [dispatch,userName, sendRequest]);

  const removeExpense = async(expense) => {
    try {
      setIsLoading(expense.id);
      await sendRequest({
        method : "DELETE",
        id: expense.id
      });
      setIsLoading(null);
      dispatch(ExpenseActions.removeExpense(expense));
    } catch (error) {
      console.log(error,"after delete");
    }
  };

  const editExpense = (expense) => {
    console.log(expense,"edit showExpense");
    dispatch(ExpenseActions.editExpense(expense));
    // dispatch(ExpenseActions.removeExpense(expense));
  }

  return (
    <div className={classes.box}>
      <h2 className={classes.text}>Expenses</h2>
      {expenses.length === 0 && <h6 className={classes.text} >No Expenses!</h6>}
      {expenses.length > 0 &&
        expenses.map(expense => 
          <div key={expense.id} className={classes.expense}>
            <h5>{expense.name}</h5>
            <h5>{expense.category}</h5>
            <h5>{expense.price}</h5>
            <h5>{expense.date}</h5>
            <Button 
              onClick={editExpense.bind(null, expense)}
            >
              Edit
            </Button>
            <Button 
              onClick={removeExpense.bind(null, expense)} 
              variant="danger"
            >
              {(isLoading === expense.id) ?   
                <span>
                  Removing...
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
                </span>
                : 
                'Remove Expense'
              }
            </Button>
          </div>
        )}
    </div>
  );
};

export default ShowExpenses;
