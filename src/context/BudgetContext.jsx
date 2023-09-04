import React, {useContext, useState} from "react"
import {v4 as uuidv4} from 'uuid'
import uselocalstorage from "../hooks/uselocalstorage"

const BudgetContext = React.createContext()

export const UNCATOGRIZED_BUDGET_ID = "Uncatorized"

export function useBudgets() {
    return useContext(BudgetContext)
}

export const BudgetProvider = ({children}) => {
    const [budgets, setBudgets] = uselocalstorage("budgets", [])
    const [expenses, setExpenses] = uselocalstorage("expenses", [])


    function getBudgetsExpenses(id) {
        return expenses.filter(expenses => expenses.budgetId === id)

    }

    function addExpense({description, amount, budgetId}) {
        console.log(amount)
        setExpenses(prevExpenses => {
            return [...prevExpenses, {id: uuidv4(), description, amount, budgetId}]
        })

    }

    function addBudget({name, max}) {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets
            }
            console.log(prevBudgets);
            return [...prevBudgets, {id: uuidv4(), name, max}]
        })

    }

    function deleteBudget({id}) {
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)
        })
    }

    function deleteExpense({id}) {
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


