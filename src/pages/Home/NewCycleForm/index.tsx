import { FormContainer, TaskInput, MinutesAmountInput } from './styles';
import { useContext } from 'react';

import { useFormContext } from 'react-hook-form';
import { CycleContext } from '../../../contexts/CyclesContext';

export function NewCycleForm() {
  const { activeCycle } = useContext(CycleContext)
  const { register } = useFormContext();
  
  return (
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
  )
}