import { useEffect, useRef, useState } from "react";
import { Button, Form, Row, Col, Container, Spinner } from "react-bootstrap";
import classes from "./ExpenseForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ExpenseActions } from "../../store/ExpenseSlice";
import useHttp from "../../hooks/useHttp";

const ExpenseForm = () => {

  const sendRequest = useHttp();

  const editingExpense = useSelector(state => state.expense.editingExpense);
  const [showExpenseForm,setShowExpenseForm] = useState(false);

  const showExpenseFormHanlder = () =>{
    setShowExpenseForm(!showExpenseForm);
  }
  const dispatch = useDispatch();

  const nameRef = useRef();
  const categoryRef = useRef();
  const priceRef = useRef();
  const dateRef = useRef();

  useEffect(() => {
    if (editingExpense) {
      console.log(editingExpense, "edit expense in form");
      nameRef.current.value = editingExpense.name;
      categoryRef.current.value = editingExpense.category;
      priceRef.current.value = editingExpense.price;
      dateRef.current.value = editingExpense.date;
    }
  },[editingExpense]);

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async(event) => {
    try {
      event.preventDefault();
      const name = nameRef.current.value;
      const category = categoryRef.current.value;
      const price = +priceRef.current.value;
      const date = dateRef.current.value;
  
      const expense = { name, category, price, date };
      setIsLoading(true);
      if (editingExpense) {
        const data = await sendRequest({
          method : "PUT",
          body : expense,
          id : editingExpense.id
        });
        dispatch(ExpenseActions.updateExpense({id:editingExpense.id,...data}));
        dispatch(ExpenseActions.removeEditingExpense());
      }
      else{
        const data = await sendRequest({
          method : "POST",
          body : expense
        });
    
        console.log(data,"after post");
        dispatch(ExpenseActions.addExpense({...expense,id:data.name}));
      }
      setIsLoading(false);
      nameRef.current.value = "";
      categoryRef.current.value = "";
      priceRef.current.value = "";
      dateRef.current.value = "";
      
    } catch (error) {
      setIsLoading(false);
      console.log(error,"sumithandler")
    }
  };
  console.log(editingExpense,"editexp form");
  return (
    <Container fluid className="bg-warning p-3">
      {!showExpenseForm && !editingExpense &&
        <Button 
          className={classes.addExpense}
          // style={{marginLeft:"45%"}}
          onClick={showExpenseFormHanlder}
        >
          Add Expense
        </Button>
      }
      {(editingExpense || showExpenseForm) &&
        <Row>
          <Form onSubmit={submitHandler}>
            <Row>
              <Col className="col">
                <Form.Group>
                  <Form.Label className={classes.label}>Expense Name:</Form.Label>
                  <Form.Control 
                    // defaultValue={editingExpense ? editingExpense.name : ""} 
                    placeholder="Expense Name" type="text" ref={nameRef}></Form.Control>
                </Form.Group>
              </Col>

              <Col className="col">
                <Form.Group>
                  <Form.Label className={classes.label}>Price:</Form.Label>
                  <Form.Control
                    // defaultValue={editingExpense ? editingExpense.price : ""}
                    placeholder="Price" type="number" ref={priceRef}></Form.Control>
                </Form.Group>
              </Col>

              <Col className="col">
                <Form.Group>
                  <Form.Label className={classes.label}>Category:</Form.Label>
                  <Form.Select
                    // defaultValue={editingExpense ? editingExpense.category : ""}
                    type="select" ref={categoryRef} required>
                    <option value="" hidden>Choose Category</option>
                    <option value="Food">Food</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Fuel">Fuel</option>
                    <option value="House Expense">House Expense</option>
                    <option value="Education Fee">Education Fee</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col className="col">
                <Form.Group>
                  <Form.Label className={classes.label}>Date of Expense:</Form.Label>
                  <Form.Control
                    // defaultValue={editingExpense ? editingExpense.date : ""}
                    placeholder="Expense Name" type="date" ref={dateRef}></Form.Control>
                </Form.Group>
              </Col>
              <Col className="col-2">
                <Button className={classes.button} type="submit" variant="success">
                  {isLoading ?   
                    <span>
                      {editingExpense ? "Updating..." : "Adding..."}
                      <Spinner 
                        as="span" 
                        animation="border" 
                        size="sm" 
                        role="status" 
                        aria-hidden="true"
                      />
                    </span>
                    : 
                    editingExpense ? "Update Expense" : "Add Expense"
                  }
                </Button>{' '}
              
                <Button 
                  disabled={editingExpense}
                  variant="dark"
                  className={classes.button} 
                  onClick={showExpenseFormHanlder} 
                >
                  close
                </Button>
              </Col>
            </Row>
          </Form>
      </Row>
      }
    </Container>
  );
};

export default ExpenseForm;
