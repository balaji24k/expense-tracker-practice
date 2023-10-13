import { useState,useRef } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Button, Form, Nav, Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const SignUpForm = (props) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const showConfirmPasswordHandler = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    console.log(enteredConfirmPassword,enteredPassword)
    if (enteredConfirmPassword !== enteredPassword) {
      alert("Password does not match");
      return;
    }
    props.submitHandler(enteredEmail,enteredPassword);
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    confirmPasswordInputRef.current.value = "";
  }

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email"
          required
          ref={emailInputRef}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password:</Form.Label>
        <div className="input-group">
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            ref={passwordInputRef}
          />
          <Button className="input-group-append" onClick={showPasswordHandler}>
            {showPassword ? <BsEyeSlash /> : <BsEye />}
          </Button>
        </div>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Confirm Password:</Form.Label>
        <div className="input-group">
          <Form.Control
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Password"
            ref={confirmPasswordInputRef}
          />
          <Button className="input-group-append" onClick={showConfirmPasswordHandler}>
            {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
          </Button>
        </div>
      </Form.Group>
      <Button type="submit" variant="primary">
        {props.isLoading ?   
          <span>
            Creating...
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
          </span>
          : 
          'Signup'
        }
      </Button>
      <Nav>
        <NavLink to="/login">
          Have an Account?
        </NavLink>
      </Nav>
    </Form>
  );
};

export default SignUpForm;
