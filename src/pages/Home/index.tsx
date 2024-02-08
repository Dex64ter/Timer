import { useEffect, useState, createContext } from 'react';
import { HandPalm, Play } from 'phosphor-react';
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from "./styles";
import { NewCycleForm } from './NewCycleForm';
import { Countdown } from './Countdown';

interface Cycle {
  id: string,
  task: string,
  minutesAmount: number,
  startDate: Date,
  interruptDate?: Date,
  finishedDate?: Date
}

interface CycleContextType {
  activeCycle: Cycle | undefined,
  activeCycleID: string | null,
  markCycleAsFinished: () => void
}

export const CycleContext = createContext({} as CycleContextType)

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleID, setActiveCycleID] = useState<string | null>(null);


  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleID);
  
  
  // function onHandleSubmit(data: NewCycleFormData) {
    //   const id = String(new Date().getTime());
    
    //   const newCycle: Cycle = {
      //     id,
      //     task: data.task,
      //     minutesAmount: data.minutesAmount,
      //     startDate: new Date
      //   }

      //   setCycles((state) => [...state, newCycle]);
  //   setActiveCycleID(id);
  //   setAmountSecondsPassed(0)
  
  //   reset();
  // }

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

  function handleInterrupt() {
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

  // const task = watch("task");
  // const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form /* onSubmit={handleSubmit(onHandleSubmit)}*/ action="">
        <CycleContext.Provider value={{ activeCycle, activeCycleID, markCycleAsFinished }}>
          {/* <NewCycleForm /> */}
          <Countdown />
        </CycleContext.Provider>

        {
          activeCycle ? 
          (
            <StopCountDownButton onClick={handleInterrupt} type="button">
              <HandPalm size={24} />
              Interromper
            </StopCountDownButton>            
          )
          :
          (
            <StartCountDownButton /*disabled={isSubmitDisabled}*/ type="submit">
              <Play size={24} />
              Começar
            </StartCountDownButton> 
          )
        }
      </form>
    </HomeContainer>
  );
}
