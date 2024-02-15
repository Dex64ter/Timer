import { createContext, useState, ReactNode, useReducer } from "react"
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer"
import { AddNewCycleAction, InterruptCycleAction, MarkCycleAsFinishedAction } from "../reducers/cycles/actions"

interface CreateCycleData {
  task: string,
  minutesAmount: number
}

interface CycleContextType {
  cycles: Cycle[],
  activeCycle: Cycle | undefined,
  activeCycleID: string | null,
  markCycleAsFinished: () => void,
  amountSecondsPassed: number,
  setPassedSeconds: (seconds: number) => void,
  createNewCycle: (data: CreateCycleData) => void,
  interruptCurrentCycle: () => void
}

export const CycleContext = createContext({} as CycleContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children
}: CyclesContextProviderProps ) {
  const [cyclesState, dispatch] = useReducer( cyclesReducer, {
    cycles: [],
    activeCycleID: null
  });
  
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const {cycles, activeCycleID } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleID);

  function setPassedSeconds(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCycleAsFinished() {
    dispatch(MarkCycleAsFinishedAction())
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());
  
    const newCycle: Cycle = {
        id,
        task: data.task,
        minutesAmount: data.minutesAmount,
        startDate: new Date
      }

    dispatch(AddNewCycleAction(newCycle))

    setAmountSecondsPassed(0)
  }

function interruptCurrentCycle() {
  dispatch(InterruptCycleAction())
}

  return (
    <CycleContext.Provider value={{
      cycles,
      activeCycle,
      activeCycleID,
      markCycleAsFinished,
      amountSecondsPassed,
      setPassedSeconds,
      createNewCycle,
      interruptCurrentCycle
    }}>
      { children }
    </CycleContext.Provider>
  )
}