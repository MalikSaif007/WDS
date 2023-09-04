import {Button, Container, Stack} from "react-bootstrap"
import BudgetCard from "./components/BudgetCard"
import AddBudgetModal from "./components/AddBudgetmodal"
import AddExpenseModal from "./components/addExpenseModal"
import {useState} from "react"
import {useBudgets} from "./context/BudgetContext"


function App() {
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
    const [AddExpenseModalBudgetId, setAddExpenseModal] = useState()
    const {budgets, getBudgetsExpenses} = useBudgets()

    function openAddExpenseModal(budgetId) {
        setShowAddExpenseModal(true)
        setAddExpenseModal(budgetId)
    }

    return (
        <>
            <Container className="my-4">
                <Stack direction="horizontal" gap="2" className="mb-4">
                    <h1 className="me-auto"> Budgets </h1>
                    <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budget </Button>
                    <Button variant="outline-primary" onClick={openAddExpenseModal}>Add expense </Button>
                </Stack>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeate (autofill,minmax(300px,ifr))",
                    gap: "Iram",
                    alignItems: "flex-start",
                }}
                >
                    {budgets.map(budget => {
                        const amount = getBudgetsExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
                        return (
                            <BudgetCard
                                key={budget.id}
                                name={budget.name}
                                amount={amount}
                                max={budget.max}
                                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                            />
                        )

                    })}

                </div>
            </Container>
            <AddBudgetModal
                show={showAddBudgetModal}
                handleClose={() => setShowAddBudgetModal(false)}
            />

            <AddExpenseModal
                show={showAddExpenseModal}
                deafultBudgetId={AddExpenseModalBudgetId}
                handleClose={() => setShowAddBudgetModal(false)}
            />
        </>
    )
}


export default App
