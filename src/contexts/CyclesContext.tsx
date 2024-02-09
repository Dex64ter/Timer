import { createContext, useState, ReactNode } from "react"

interface Cycle {
  id: string,
  task: string,
  minutesAmount: number,
  startDate: Date,
  interruptDate?: Date,
  finishedDate?: Date
}

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

export function CyclesContextProvider({ children }: CyclesContextProviderProps ) {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleID, setActiveCycleID] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleID);


  function setPassedSeconds(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleID) {          
          return { ...cycle, finishedDate: new Date()}
        }else {
          return cycle
        }
      })
    )
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());
  
    const newCycle: Cycle = {
        id,
        task: data.task,
        minutesAmount: data.minutesAmount,
        startDate: new Date
      }

      setCycles((state) => [...state, newCycle]);
    setActiveCycleID(id);
    setAmountSecondsPassed(0)
  }

function interruptCurrentCycle() {
  setCycles((state) =>
    state.map((cycle) => {
      if (cycle.id === activeCycleID) {          
        return { ...cycle, interruptDate: new Date()}
      }else {
        return cycle
      }
    })
  )

  setActiveCycleID(null)
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