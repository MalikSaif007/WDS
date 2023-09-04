import React, { useContext, useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import uselocalstorage from "../hooks/uselocalstorage"

const BudgetContext = React.createContext()

export const UNCATOGRIZED_BUDGET_ID = "Uncatorized"

export function useBudgets() {
    return useContext(BudgetContext)
}
export const BudgetProvider = ({ children }) => {
    const [budgets, setBudgets] = uselocalstorage("budgets", [])
    const [expenses, setExpenses] = uselocalstorage("expenses", [])


    function getBudgetsExpenses(budgetid) {
        return expenses.filter(expenses => expenses.budgetid === budgetid)

    }
    function addExpense({ description, amount, budgetid }) {
        console.log(amount)
        setExpenses(prevExpenses => {
            return [...prevExpenses, { id: uuidv4(), description, amount, budgetid }]
        })
       
    }
    function addBudget({name, max}) {
        setBudgets(prevBudgets => {
            if (prevBudgets.filter(budget => budget.name === name)) {
                return prevBudgets
            }
            return [...prevBudgets, { id: uuidv4(), name, max }]
        })

    }
    function deleteBudget({ id }) {
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)
        })
    }
    function deleteExpense({ id }) {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }
    return (

        <BudgetContext.Provider value={{
            budgets,
            expenses,
            getBudgetsExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense


        }}>{children}</BudgetContext.Provider>
    )


}


