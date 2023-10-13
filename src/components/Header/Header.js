import { useContext, useState } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import AuthContext from "../../store/AuthContext";
import classes from "./Header.module.css";
import { useSelector } from "react-redux";
import { saveAs } from "file-saver";
import { useDispatch } from "react-redux";
import { ExpenseActions } from "../../store/ExpenseSlice";

const Header = (props) => {
  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);
  const userName = authCtx.userEmail && authCtx.userEmail.split("@")[0];

  const [isPremiumEligible, setIsPremiumEligible] = useState(
    localStorage.getItem("isPremiumEligible") === userName
  );
  const [isPremiumTaken, setIsPremiumTaken] = useState(
    localStorage.getItem("isPremiumTaken") === userName
  );

  const expenses = useSelector((state) => state.expense.expenses);
  console.log(expenses,"totalexp in header")
  const totalExpenses = expenses && expenses.reduce((sum,expense)=> sum+expense.price,0);

  if (!isPremiumEligible && totalExpenses > 10000) {
    localStorage.setItem("isPremiumEligible",userName);
    setIsPremiumEligible(true);
  }

  const activatePremium = () => {
    localStorage.setItem("isPremiumTaken",userName);
    setIsPremiumTaken(true);
  }

  const darkMode = () => {
    localStorage.setItem("darkMode",userName);
    props.darkModeHandler(true);
  }

  const removeDarkMode = () => {
    localStorage.removeItem("darkMode");
    props.darkModeHandler(false);
  }

  const logoutHandler = () => {
    authCtx.logout();
    dispatch(ExpenseActions.replaceExpense([]));
    removeDarkMode();
  }

  const downloadExpense = () => {
    const data =
      "Expense,Category,Amount\n" + 
      expenses.map(
        ({name,category,price})=> `${name},${category},${price}`
      ).join("\n");

    // console.log(csv,"csv")
    // Create a new blob with the CSV data
    const blob = new Blob([data]);

    // Save the blob as a file with the name "expenses.csv"
    saveAs(blob, "expenses.csv");
  }

  return (
    <Container fluid>
      <Row className= "bg-success p-1">
        <Col className="col-5">
          <h3 className={classes.label}>User: {userName}</h3>
        </Col>
        <Col className="col-3">
          <h2 className={classes.label}>Expense Tracker</h2>
        </Col>
        <Col className="col-3">
          {isPremiumEligible && !isPremiumTaken &&
           <Button onClick={activatePremium} >Activate Premium</Button>
          }
          {isPremiumTaken && !props.isDarkMode &&
           <Button onClick={darkMode} >Dark Mode</Button>
          }
          {isPremiumTaken && props.isDarkMode &&
           <Button onClick={removeDarkMode} >Light Mode</Button>
          }
          {isPremiumTaken &&
          <>
            {' '}
            <Button 
              // variant="outline-info"
              onClick={downloadExpense} 
            >
              Download Expenses
            </Button>
          </>
          }
        </Col>
        <Col className="col-1">
          <Button
            className={classes.button}
            variant="danger"
            onClick={logoutHandler}
          >
            Logout
          </Button>

        </Col>
      </Row>
    </Container>
  );
};

export default Header;
