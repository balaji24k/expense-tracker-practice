import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AuthContext = React.createContext({
  userEmail: "",
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
});

export const AuthProvider = (props) => {
	const history = useHistory();
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));
  const [token, setToken] = useState(localStorage.getItem("token"));

  const isLoggedIn = !!token;

  const loginHandler = (token,email) => {
    // console.log(token, email, "in login handler authctx");
		localStorage.setItem("token",token);
    localStorage.setItem("userEmail",email);
    setToken(token);
    setUserEmail(email);
  };

  const logoutHandler = () => {
		// console.log("logout");
		history.replace("/");
    setToken(null);
    setUserEmail(null);
    localStorage.clear();
  };

  const obj = {
    userEmail: userEmail,
    login: loginHandler,
    logout: logoutHandler,
    isLoggedIn: isLoggedIn,
  };
  return (
    <AuthContext.Provider value={obj}>
			{props.children}
		</AuthContext.Provider>
  );
};

export default AuthContext;
