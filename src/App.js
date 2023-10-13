import "./App.css";
import LoginPage from "./components/Authentication/LoginPage";
import { Route, Switch, Redirect,} from "react-router-dom";
import SignUpPage from "./components/Authentication/SignUpPage";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ShowExpenses from "./components/ShowExpenses/ShowExpenses";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./store/AuthContext";
import Header from "./components/Header/Header";

function App() {
  console.log("app")

  const authCtx = useContext(AuthContext);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const darkModeHandler = (isDarkMode) => {
    setIsDarkMode(isDarkMode);
  }

  useEffect(()=>{
    if (localStorage.getItem("darkMode")) {
      setIsDarkMode(true)
    }
  },[authCtx.userEmail])


  return (
    <div className={isDarkMode ? "darkMode" : ""}>
      <Switch>
        <Route exact path="/login">
          {!authCtx.isLoggedIn && <LoginPage />}
          {authCtx.isLoggedIn && <Redirect to="/expenses" />}
        </Route>
        <Route exact path="/signup">
          {!authCtx.isLoggedIn && <SignUpPage />}
          {authCtx.isLoggedIn && <Redirect to="/expenses" />}
        </Route>
        <Route exact path="/expenses">
          {authCtx.isLoggedIn && (
            <>
              <Header darkModeHandler={darkModeHandler} isDarkMode={isDarkMode} />
              <ExpenseForm/>
              <ShowExpenses isDarkMode={isDarkMode} />
            </>
          )}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route exact path="*">
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
          {authCtx.isLoggedIn && <Redirect to="/expenses" />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
