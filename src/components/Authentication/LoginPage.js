import React, { useContext, useState } from "react";
import classes from "./Auth.module.css";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/AuthContext";
import LoginForm from "./LoginForm";
import useHttp from "../../hooks/useHttp";

const LoginPage = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const sendRequest = useHttp();

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async(email,password) => {
    try {
      setIsLoading(true);   
      const data = await sendRequest({
        url : "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZmAyELegQIUlAxdcsCJ-P-HtMA5EvRis",
        method : "POST",
        body :  { email,  password, returnSecureToken: true}
      });
      console.log(data,"login");
      authCtx.login(data.idToken,data.email);
      history.replace('/store');
      setIsLoading(false);
      
    } catch (error) {
      setIsLoading(false);
      alert(error);
    }
  };
  return (
    <section className={classes.box}>
      <h1>Login</h1>
      <LoginForm isLoading={isLoading} submitHandler={submitHandler} />
    </section>
  );
};

export default LoginPage;
