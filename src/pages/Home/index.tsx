import { useState, createContext } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
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
  markCycleAsFinished: () => void,
  amountSecondsPassed: number,
  setPassedSeconds: (seconds: number) => void
}

export const CycleContext = createContext({} as CycleContextType)

const newCycleFormSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos')
})

// sempre que eu quero trazer uma variável javascript para o typescript usamos o typeof e o nome d variável;

type NewCycleFormData = zod.infer<typeof newCycleFormSchema>

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleID, setActiveCycleID] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  });

  const { handleSubmit, watch, reset } = newCycleForm;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleID);
  
  function setPassedSeconds(seconds: number) {
    setAmountSecondsPassed(seconds)
  }
  
  function onHandleSubmit(data: NewCycleFormData) {
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
  
    reset();
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

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(onHandleSubmit)} action="">
        <CycleContext.Provider value={{ activeCycle, activeCycleID, markCycleAsFinished, amountSecondsPassed, setPassedSeconds }}>
          
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
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
            <StartCountDownButton disabled={isSubmitDisabled} type="submit">
              <Play size={24} />
              Começar
            </StartCountDownButton> 
          )
        }
      </form>
    </HomeContainer>
  );
}
