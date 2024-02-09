import { useContext } from 'react';
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
import { CycleContext } from '../../contexts/CyclesContext';

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
  const { activeCycle, interruptCurrentCycle, createNewCycle } = useContext(CycleContext);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  });

  const { handleSubmit, watch, /*reset*/ } = newCycleForm;

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)} action="">          
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        {
          activeCycle ? 
          (
            <StopCountDownButton onClick={interruptCurrentCycle} type="button">
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
