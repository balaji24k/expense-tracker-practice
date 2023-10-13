import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
  expenses : [],
  editingExpense : null
}

const ExpenseSlice = createSlice({
  name: "Expenses",
  initialState: initialExpenseState,
  reducers: {
    addExpense(state,action) {
      state.expenses.push(action.payload);
    },
    removeExpense(state, action) {
      state.expenses = state.expenses.filter(
        exp => exp.id !== action.payload.id
      );
    },
    updateExpense(state, action) {
			const updatingExpense = action.payload;
      // console.log(updatingExpense,"update expense slice");
      const updateExpenses = state.expenses.map(
        exp => (exp.id === updatingExpense.id) ? updatingExpense : exp
      )
      state.expenses = updateExpenses;
    },
    replaceExpense(state, action) {
			state.expenses = action.payload;
    },
    editExpense(state,action) {
      state.editingExpense = {...action.payload};
    },
    removeEditingExpense(state,action) {
      state.editingExpense = null;
    }
  },
});

export const ExpenseActions = ExpenseSlice.actions;

export default ExpenseSlice;
