import { HandPalm, Play } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod'
import { differenceInSeconds } from 'date-fns'
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  StopCountDownButton,
  TaskInput,
} from "./styles";
import { useEffect, useState } from 'react';

const newCycleFormSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos')
})

// interface NewCycleFormData {
//   task: string,
//   minutesAmount: number
// }

// sempre que eu quero trazer uma variável javascript para o typescript usamos o typeof e o nome d variável;

type NewCycleFormData = zod.infer<typeof newCycleFormSchema>

interface Cycle {
  id: string,
  task: string,
  minutesAmount: number,
  startDate: Date,
  interruptDate?: Date,
  finishedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleID, setActiveCycleID] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  });

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleID);
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDiff = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDiff >= totalSeconds ) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleID) {          
                return { ...cycle, finishedDate: new Date()}
              }else {
                return cycle
              }
            })
          )
          setAmountSecondsPassed(totalSeconds)
          clearInterval(interval);
        }else {
          setAmountSecondsPassed(secondsDiff)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval);
    }
  }, [activeCycle, totalSeconds, activeCycleID])

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

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2,"0");
  const seconds = String(secondsAmount).padStart(2,"0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(onHandleSubmit)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            placeholder="Dê um nome para seu projeto"
            list="task-suggestions"
            disabled={!!activeCycle}
            {...register("task") }
          />
          
          <datalist id="task-suggestions">
            <option value="Trabalhar no projeto" />
            <option value="Estudar tecnologia" />
            <option value="Trabalhar no TCC" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5}
            max={60}
            min={0}
            {...register("minutesAmount", {valueAsNumber: true}) }
          />
          <span>minutos</span>
        </FormContainer>

        <CountDownContainer>
          <span> {minutes[0]} </span>
          <span> {minutes[1]} </span>
          <Separator>:</Separator>
          <span> {seconds[0]} </span>
          <span> {seconds[1]} </span>
        </CountDownContainer>

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
