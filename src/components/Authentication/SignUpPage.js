import { useState } from "react";
import classes from "./Auth.module.css";
import { useHistory } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import useHttp from "../../hooks/useHttp";

const SignUpPage = () => {
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const sendRequest = useHttp();

  const submitHandler = async(email,password) => {
    try {
      setIsLoading(true);
      const data = await sendRequest({
        url : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZmAyELegQIUlAxdcsCJ-P-HtMA5EvRis",
        method : "POST",
        body :  { email,  password, returnSecureToken: true}
      });
      console.log(data,"success signup")
      setIsLoading(true); 
      history.replace('/login');
      alert("Accouct Created Succesfully!")
    } 
    catch (error) {
      setIsLoading(false);
      alert(error);
    }
  };
  return (
    <section className={classes.box}>
      <h1>SignUp</h1>
      <SignUpForm submitHandler={submitHandler} isLoading={isLoading} />
    </section>
  );
};
export default SignUpPage;